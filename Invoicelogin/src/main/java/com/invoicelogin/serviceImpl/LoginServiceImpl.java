package com.invoicelogin.serviceImpl;

import com.invoicelogin.auth.JwtTokenUtil;
import com.invoicelogin.common.ResponseBuilder;
import com.invoicelogin.config.EmailService;
import com.invoicelogin.exceptions.InvoiceErrorMessageHandler;
import com.invoicelogin.exceptions.InvoiceErrorMessageKey;
import com.invoicelogin.exceptions.InvoiceException;
import com.invoicelogin.request.*;
import com.invoicelogin.response.LoginResponse;
import com.invoicelogin.service.LoginService;
import com.invoicelogin.config.PropertiesConfig;
import com.invoicelogin.util.Constants;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@Service
@Slf4j
public class LoginServiceImpl implements LoginService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private PropertiesConfig propertiesConfig;

    @Autowired
    private JavaMailSender mailSender;

    private final EmailService emailService;
    private final JavaMailSender emailSender;

    public LoginServiceImpl(EmailService emailService, JavaMailSender emailSender) {
        this.emailService = emailService;
        this.emailSender = emailSender;
    }

    @Override
    public ResponseEntity<?> login(AdminLoginRequest request) throws InvoiceException {
        if (!request.getUserName().equals(propertiesConfig.getAdmin()) &&
                !request.getPassword().equals(propertiesConfig.getAdminPassword())) {
            log.error("User not found for Admin: {}", request.getUserName());
            throw new InvoiceException(InvoiceErrorMessageHandler.getMessage(InvoiceErrorMessageKey.INVALID_USERNAME), HttpStatus.NOT_FOUND);
        }
        String token = JwtTokenUtil.generateToken(request.getUserName(), Collections.singletonList(propertiesConfig.getAdminRole()));
        log.info("Generated Token: {}", token);

        return ResponseEntity.ok(ResponseBuilder.builder().build().createSuccessResponse(new LoginResponse(token, null)));
    }

    @Override
    public ResponseEntity<?> companyLogin(CompanyLoginRequest request) throws InvoiceException {
        log.info("Attempting login for email: {}", request.getCompanyEmail());

        Map<String, Object> company = fetchCompanyByEmail(request.getCompanyEmail());
        if (company == null) {
            log.error("Invalid email: {}", request.getCompanyEmail());
            throw new InvoiceException(InvoiceErrorMessageKey.INVALID_EMAIL.getMessage(), HttpStatus.BAD_REQUEST);
        }
        Long companyId = (Long) company.get(Constants.COMPANY_ID);
        if (companyId == null) {
            log.error("Company ID not found for email: {}", request.getCompanyEmail());
            throw new InvoiceException(InvoiceErrorMessageKey.COMPANY_ID_NOT_FOUND.getMessage(), HttpStatus.NOT_FOUND);
        }
        String storedPassword = (String) company.get(Constants.PASSWORD);
        if (storedPassword != null && storedPassword.equals(request.getPassword())) {
            log.info("Login successful for email: {}", request.getCompanyEmail());
            String newOtp = String.valueOf(generateOtp());
            long expiryTime = Instant.now().plus(propertiesConfig.getOtpExpiryMinutes(), ChronoUnit.MINUTES).getEpochSecond();

            jdbcTemplate.update(propertiesConfig.getCompanyUpdateOtpQuery(), newOtp, expiryTime, request.getCompanyEmail());
            log.info("New OTP generated and stored for email: {}", request.getCompanyEmail());

            // Offload email sending to a background thread
            CompletableFuture.runAsync(() -> {
                try {
                    sendOtpEmail(request.getCompanyEmail(), newOtp, (int) propertiesConfig.getOtpExpiryMinutes());
                } catch (MessagingException e) {
                    log.error("Failed to send OTP email to {}: {}", request.getCompanyEmail(), e.getMessage());
                }
            });
            String token = JwtTokenUtil.generateToken(String.valueOf(companyId), Collections.singletonList(propertiesConfig.getCompanyRole()));
            log.info("Generated Token: {}", token);
            return new ResponseEntity<>(ResponseBuilder.createSuccessResponse(new LoginResponse(token, Constants.SUCCESS)), HttpStatus.OK);
        } else {
            log.error("Password does not match for email: {}", request.getCompanyEmail());
            throw new InvoiceException(InvoiceErrorMessageKey.INVALID_EMAIL_PASSWORD.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    public void sendOtpEmail(String recipientEmail, String otp, int validMinutes) throws MessagingException {
        String emailContent = emailService.buildOtpEmailContent(otp, validMinutes);
        String subject = emailService.getOtpEmailSubject();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipientEmail);
        message.setSubject(subject);
        message.setText(emailContent);
        emailSender.send(message);
        log.info("OTP sent successfully....");
    }

    @Override
    public ResponseEntity<?> UserLogin(UserLoginRequest request) throws InvoiceException {
        log.info("Attempting login for email: {}", request.getUserEmail());

        // Fetch user details
        Map<String, Object> user = fetchUserByEmail(request.getUserEmail());
        if (user == null) {
            log.error("Invalid email: {}", request.getUserEmail());
            throw new InvoiceException(InvoiceErrorMessageKey.INVALID_EMAIL.getMessage(), HttpStatus.BAD_REQUEST);
        }

        Long userId = (Long) user.get(Constants.USER_ID);
        if (userId == null) {
            log.error("User ID not found for email: {}", request.getUserEmail());
            throw new InvoiceException(InvoiceErrorMessageKey.USERID_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        String storedPassword = (String) user.get(Constants.PASSWORD);
        if (!storedPassword.equals(request.getPassword())) {
            log.error("Password mismatch for email: {}", request.getUserEmail());
            throw new InvoiceException(InvoiceErrorMessageKey.INVALID_EMAIL_PASSWORD.name(), HttpStatus.UNAUTHORIZED);
        }

        log.info("Login successful for email: {}", request.getUserEmail());

        // Generate OTP
        String newOtp = String.valueOf(generateOtp());
        long expiryTime = Instant.now()
                .plus(propertiesConfig.getOtpExpiryMinutes(), ChronoUnit.MINUTES)
                .getEpochSecond();

        // Store OTP in the database
        jdbcTemplate.update(propertiesConfig.getUserUpdateOtpQuery(), newOtp, expiryTime, request.getUserEmail());
        log.info("New OTP generated and stored for email: {}", request.getUserEmail());

        // Offload email sending to a background thread
        CompletableFuture.runAsync(() -> {
            try {
                sendOtpEmail(request.getUserEmail(), newOtp, (int) propertiesConfig.getOtpExpiryMinutes());
            } catch (MessagingException e) {
                log.error("Failed to send OTP email to {}: {}", request.getUserEmail(), e.getMessage());
            }
        });
        // Generate JWT token
        String token = JwtTokenUtil.generateToken(String.valueOf(userId), Collections.singletonList(propertiesConfig.getUserRole()));
        log.info("Generated Token: {}", token);
        // Build response
        LoginResponse loginResponse = new LoginResponse(token, Constants.SUCCESS);
        return new ResponseEntity<>(ResponseBuilder.createSuccessResponse(loginResponse), HttpStatus.OK);
    }

    private Map<String, Object> fetchUserByEmail(String email) {
        try {
            return jdbcTemplate.queryForMap(propertiesConfig.getUserSelectQuery(), email);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    private Map<String, Object> fetchCompanyByEmail(String email) {
        try {
            return jdbcTemplate.queryForMap(propertiesConfig.getCompanySelectQuery(), email);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    private int generateOtp() {
        return (int) (Math.random() * 900000) + 100000;
    }

    @Override
    public ResponseEntity<?> validateOtp(UserOtpRequest request) throws InvoiceException {
        return validateOtpForUser(request.getUserEmail(), Math.toIntExact(request.getOtp()));
    }

    @Override
    public ResponseEntity<?> validateCompanyOtp(CompanyOtpRequest request) throws InvoiceException {
        return validateOtpForCompany(request.getCompanyEmail(), Math.toIntExact(request.getOtp()));
    }

    private ResponseEntity<?> validateOtpForUser(String email, int otp) throws InvoiceException {
        Map<String, Object> user = fetchUserByEmail(email);
        if (user == null) {
            log.error("User not found for email: {}",email);
            throw new InvoiceException(InvoiceErrorMessageHandler.getMessage(InvoiceErrorMessageKey.USER_NOT_FOUND), HttpStatus.NOT_FOUND);
        }
        return validateOtpAndClear(email, otp, Constants.USER);
    }

    private ResponseEntity<?> validateOtpForCompany(String email, int otp) throws InvoiceException {
        Map<String, Object> company = fetchCompanyByEmail(email);
        if (company == null) {
            log.error("company not found for email: {}", email);
            throw new InvoiceException(InvoiceErrorMessageHandler.getMessage(InvoiceErrorMessageKey.COMPANY_NOT_FOUND), HttpStatus.NOT_FOUND);
        }

        return validateOtpAndClear(email, otp, Constants.COMPANY);
    }

    private ResponseEntity<?> validateOtpAndClear(String email, int otp, String type) throws InvoiceException {

        String selectOtpQuery = type.equals(Constants.USER) ? propertiesConfig.getUserSelectOtpQuery() : propertiesConfig.getCompanySelectOtpQuery();
        Map<String, Object> entity = jdbcTemplate.queryForMap(selectOtpQuery, email);

        String storedOtp = (String) entity.get(Constants.OTP);
        Long expiryTime = (Long) entity.get(Constants.EXPIRY_TIME);

        if (storedOtp != null) {
            if (!String.valueOf(otp).equals(storedOtp)) {
                log.error("Invalid OTP provided for email: {} and type: {}", email, type);
                throw new InvoiceException(propertiesConfig.getOtpInvalidMessage(), HttpStatus.FORBIDDEN);
            }
            if (expiryTime == null) {
                log.error("Expiry time is null for OTP associated with email: {} and type: {}", email, type);
                throw new InvoiceException(propertiesConfig.getOtpExpiredMessage(), HttpStatus.FORBIDDEN);
            }

            if (Instant.now().getEpochSecond() > expiryTime) {
                log.error("OTP expired for email: {} and type: {}", email, type);
                throw new InvoiceException(propertiesConfig.getOtpExpiredMessage(), HttpStatus.FORBIDDEN);
            }
            String clearOtpSql = type.equals(Constants.USER) ? propertiesConfig.getUserNullOtpQuery(): propertiesConfig.getCompanyNullOtpQuery();
            jdbcTemplate.update(clearOtpSql, email);

            log.info("OTP successfully validated and cleared for email: {} and type: {}", email, type);
            return ResponseEntity.ok(ResponseBuilder.createSuccessResponse(Constants.SUCCESS));
        } else {
            log.error("No OTP found for email: {} and type: {}", email, type);
            throw new InvoiceException(propertiesConfig.getOtpNotFoundMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @Override
    public ResponseEntity<?> updateCompanyPassword(CompanyPassword request) throws InvoiceException {
        log.info("Attempting to update password for company with email: {}", request.getCompanyEmail());

        Map<String, Object> company = fetchCompanyByEmail(request.getCompanyEmail());
        if (company == null) {
            log.error("Company not found for email: {}", request.getCompanyEmail());
            throw new InvoiceException(InvoiceErrorMessageKey.INVALID_EMAIL.getMessage(), HttpStatus.NOT_FOUND);
        }
        Long companyId = (Long) company.get(Constants.COMPANY_ID);
        if (companyId == null) {
            log.error("Company ID not found for email: {}", request.getCompanyEmail());
            throw new InvoiceException(InvoiceErrorMessageKey.COMPANY_ID_NOT_FOUND.getMessage(), HttpStatus.NOT_FOUND);
        }
        //String storedPassword = (String) company.get(Constants.PASSWORD);
        if(!request.getConfirmPassword().equals(request.getNewPassword())){
            log.error("Entered Password is not matched");
            throw new InvoiceException(InvoiceErrorMessageKey.INVALID_EMAIL_PASSWORD.getMessage(),HttpStatus.FORBIDDEN);
        }
        if(propertiesConfig.getCompanyPassword().equals(request.getNewPassword())){
            log.error("You Can't update with the previous password");
            throw new InvoiceException(InvoiceErrorMessageKey.PASSWORD_NOT_MATCH.getMessage(),HttpStatus.FORBIDDEN);
        }

        jdbcTemplate.update(propertiesConfig.getCompanyUpdatePasswordQuery(), request.getNewPassword(), request.getCompanyEmail());
        log.info("Password updated successfully for company with email: {}", request.getCompanyEmail());

        String token = JwtTokenUtil.generateToken(request.getCompanyEmail(), Collections.singletonList(propertiesConfig.getCompanyRole()));
        log.info("Generated Token: {}", token);

        log.info("Password updated successfully for email: {}", request.getCompanyEmail());
        return new ResponseEntity<>(ResponseBuilder.createSuccessResponse(new LoginResponse(token, Constants.SUCCESS)), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> updateUserPassword(UserPassword request) throws InvoiceException {
        String email = request.getUserEmail(); // Fetch the email from the UserPassword request

        log.info("Attempting to update password for user with email: {}", email);

        // Fetch user details by email
        Map<String, Object> user = fetchUserByEmail(email);
        if (user == null) {
            log.error("User not found for email: {}", email);
            throw new InvoiceException(InvoiceErrorMessageKey.INVALID_EMAIL.getMessage(), HttpStatus.NOT_FOUND);
        }

        // Validate that the new password and confirm password match
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            log.error("Password and confirm password do not match for email: {}", email);
            throw new InvoiceException(InvoiceErrorMessageKey.PASSWORD_MISMATCH.getMessage(), HttpStatus.BAD_REQUEST);
        }

        // Prevent updating to the previous password (if needed)
        String storedPassword = (String) user.get(Constants.PASSWORD);
        if (storedPassword != null && storedPassword.equals(request.getNewPassword())) {
            log.error("You can't update to the same password for email: {}", email);
            throw new InvoiceException(InvoiceErrorMessageKey.PASSWORD_SAME_AS_PREVIOUS.getMessage(), HttpStatus.FORBIDDEN);
        }

        // Update the user's password in the database
        String updatePasswordSql = propertiesConfig.getUserUpdatePasswordQuery();
        jdbcTemplate.update(updatePasswordSql, request.getNewPassword(), email);

        log.info("Password successfully updated for user with email: {}", email);

        // Generate a new JWT token for the user after password update
        String token = JwtTokenUtil.generateToken(email, Collections.singletonList(propertiesConfig.getUserRole()));
        log.info("Generated new token for user with email: {}", email);

        // Return the response with the generated token
        return new ResponseEntity<>(ResponseBuilder.createSuccessResponse(new LoginResponse(token, Constants.SUCCESS)), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> forgotUserPassword(UserPassword request) throws InvoiceException {
        log.info("Attempting to update password for email: {}", request.getUserEmail());

        Map<String, Object> user = fetchUserByEmail(request.getUserEmail());
        if (user == null) {
            log.error("User not found for email: {}", request.getUserEmail());
            throw new InvoiceException(InvoiceErrorMessageKey.INVALID_EMAIL.getMessage(),HttpStatus.NOT_FOUND);
        }
        String newOtp = String.valueOf(generateOtp());
        long expiryTime = Instant.now().plus(propertiesConfig.getOtpExpiryMinutes(), ChronoUnit.MINUTES).getEpochSecond();

        jdbcTemplate.update(propertiesConfig.getUserUpdateOtpQuery(), newOtp, expiryTime, request.getUserEmail());
        log.info("New OTP generated and stored for email: {}", request.getUserEmail());

        // Offload email sending to a background thread
        CompletableFuture.runAsync(() -> {
            try {
                sendOtpEmail(request.getUserEmail(), newOtp, (int) propertiesConfig.getOtpExpiryMinutes());
            } catch (MessagingException e) {
                log.error("Failed to send OTP email to {}: {}", request.getUserEmail(), e.getMessage());
            }
        });
        Long userId = (Long) user.get(Constants.USER_ID);
        if (userId == null) {
            log.error("Company ID not found for email: {}", request.getUserEmail());
            throw new InvoiceException(InvoiceErrorMessageKey.USERID_NOT_FOUND.getMessage(), HttpStatus.NOT_FOUND);
        }
        //String storedPassword = (String) user.get(Constants.PASSWORD);
        if(!request.getConfirmPassword().equals(request.getNewPassword())){
            log.error("Entered Password is not matched");
            throw new InvoiceException(InvoiceErrorMessageKey.PASSWORD_NOT_MATCH.getMessage(),HttpStatus.BAD_REQUEST);
        }

        if(propertiesConfig.getUserPassword().equals(request.getNewPassword())){
            log.error("User Can't update with the previous password");
            throw new InvoiceException(InvoiceErrorMessageKey.INVALID_EMAIL_PASSWORD.getMessage(), HttpStatus.FORBIDDEN);
        }
        jdbcTemplate.update(propertiesConfig.getUserUpdatePasswordQuery(), request.getNewPassword(), request.getUserEmail());
        log.info("Password updated successfully for email: {}", request.getUserEmail());
        return new ResponseEntity<>(ResponseBuilder.createSuccessResponse( Constants.SUCCESS), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> forgotCompanyPassword(CompanyPassword request) throws InvoiceException {
        log.info("Attempting to update password for email: {}", request.getCompanyEmail());

        Map<String, Object> company = fetchCompanyByEmail(request.getCompanyEmail());
        if (company == null) {
            log.error("User not found for email: {}", request.getNewPassword());
            throw new InvoiceException(InvoiceErrorMessageKey.INVALID_EMAIL.getMessage(), HttpStatus.NOT_FOUND);
        }
        String newOtp = String.valueOf(generateOtp());
        long expiryTime = Instant.now().plus(propertiesConfig.getOtpExpiryMinutes(), ChronoUnit.MINUTES).getEpochSecond();

        jdbcTemplate.update(propertiesConfig.getCompanyUpdateOtpQuery(), newOtp, expiryTime, request.getCompanyEmail());
        log.info("New OTP generated and stored for email: {}", request.getCompanyEmail());

        try {
            sendOtpEmail(request.getCompanyEmail(), newOtp, (int) propertiesConfig.getOtpExpiryMinutes());
        } catch (MessagingException e) {
            log.error("Failed to send OTP email to {}: {}", request.getCompanyEmail(), e.getMessage());
            throw new InvoiceException(InvoiceErrorMessageKey.FAILED_TO_SEND_OTP.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        Long companyId = (Long) company.get(Constants.COMPANY_ID);
        if (companyId == null) {
            log.error("Company ID not found for email: {}", request.getCompanyEmail());
            throw new InvoiceException(InvoiceErrorMessageKey.COMPANY_ID_NOT_FOUND.getMessage(), HttpStatus.NOT_FOUND);
        }
        //String storedPassword = (String) company.get(Constants.PASSWORD);
        if(!request.getConfirmPassword().equals(request.getNewPassword())){
            log.error("Entered Password is not matched");
            throw new InvoiceException(InvoiceErrorMessageKey.INVALID_EMAIL_PASSWORD.getMessage(), HttpStatus.FORBIDDEN);
        }
        // Offload email sending to a background thread
        CompletableFuture.runAsync(() -> {
            try {
                sendOtpEmail(request.getCompanyEmail(), newOtp, (int) propertiesConfig.getOtpExpiryMinutes());
            } catch (MessagingException e) {
                log.error("Failed to send OTP email to {}: {}", request.getCompanyEmail(), e.getMessage());
            }
        });

        if(propertiesConfig.getCompanyPassword().equals(request.getNewPassword())){
            log.error("You Can't update with the previous password");
            throw new InvoiceException(InvoiceErrorMessageKey.PASSWORD_NOT_MATCH.getMessage(), HttpStatus.BAD_REQUEST);
        }
        jdbcTemplate.update(propertiesConfig.getUserUpdatePasswordQuery(), request.getNewPassword(), request.getCompanyEmail());
        log.info("Password updated successfully for email: {}", request.getCompanyEmail());
        return new ResponseEntity<>(ResponseBuilder.createSuccessResponse( Constants.SUCCESS), HttpStatus.OK);
    }
}
