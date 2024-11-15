package com.invoicelogin.serviceImpl;

import com.invoicelogin.auth.JwtTokenUtil;
import com.invoicelogin.common.ResponseBuilder;
import com.invoicelogin.exceptions.InvoiceErrorMessageHandler;
import com.invoicelogin.exceptions.InvoiceErrorMessageKey;
import com.invoicelogin.exceptions.InvoiceException;
import com.invoicelogin.request.*;
import com.invoicelogin.response.LoginResponse;
import com.invoicelogin.service.LoginService;
import com.invoicelogin.config.PropertiesConfig;
import com.invoicelogin.util.Constants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.Map;
import java.util.Random;

@Service
@Slf4j
public class LoginServiceImpl implements LoginService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private PropertiesConfig propertiesConfig;

    @Override
    public ResponseEntity<?> login(AdminLoginRequest request) throws InvoiceException {
        if (!request.getUserName().equals(propertiesConfig.getAdmin()) &&
                !request.getPassword().equals(propertiesConfig.getAdminPassword())) {
            throw new InvoiceException(InvoiceErrorMessageHandler.getMessage(InvoiceErrorMessageKey.INVALID_USERNAME), HttpStatus.NOT_FOUND);
        }

        String token = JwtTokenUtil.generateToken(request.getUserName(), Collections.singletonList(propertiesConfig.getAdminRole()));
        log.info("Generated Token: {}", token);

        return ResponseEntity.ok(
                ResponseBuilder.builder().build().createSuccessResponse(new LoginResponse(token, null))
        );
    }

    @Override
    public ResponseEntity<?> companyLogin(CompanyLoginRequest request) throws InvoiceException {
        log.info("Attempting login for email: {}", request.getCompanyEmail());

        Map<String, Object> company = fetchCompanyByEmail(request.getCompanyEmail());
        if (company == null) {
            return new ResponseEntity<>(ResponseBuilder.createFailureResponse(String.valueOf(InvoiceErrorMessageKey.INVALID_Email)), HttpStatus.UNAUTHORIZED);
        }

        String storedPassword = (String) company.get("password");
        if (storedPassword != null && storedPassword.equals(request.getPassword())) {
            log.info("Login successful for email: {}", request.getCompanyEmail());

            String newOtp = String.valueOf(generateOtp());
            long expiryTime = Instant.now().plus(propertiesConfig.getOtpExpiryMinutes(), ChronoUnit.MINUTES).getEpochSecond();

            jdbcTemplate.update(propertiesConfig.getCompanyUpdateOtpQuery(), newOtp, expiryTime, request.getCompanyEmail());

            log.info("New OTP generated and stored for email: {}", request.getCompanyEmail());

            String token = JwtTokenUtil.generateToken(request.getCompanyEmail(), Collections.singletonList(propertiesConfig.getCompanyRole()));
            log.info("Generated Token: {}", token);

            return new ResponseEntity<>(ResponseBuilder.createSuccessResponse(new LoginResponse(token, Constants.SUCCESS)), HttpStatus.OK);
        } else {
            log.warn("Password does not match for email: {}", request.getCompanyEmail());
            return new ResponseEntity<>(ResponseBuilder.createFailureResponse(String.valueOf(InvoiceErrorMessageKey.INVALID_Email_PASSWORD)), HttpStatus.UNAUTHORIZED);
        }
    }

    @Override
    public ResponseEntity<?> UserLogin(UserLoginRequest request) throws InvoiceException {
        log.info("Attempting login for email: {}", request.getUserEmail());

        Map<String, Object> user = fetchUserByEmail(request.getUserEmail());
        if (user == null) {
            return new ResponseEntity<>(ResponseBuilder.createFailureResponse(String.valueOf(InvoiceErrorMessageKey.INVALID_Email_PASSWORD)), HttpStatus.UNAUTHORIZED);
        }

        String storedPassword = (String) user.get(Constants.Password);
        if (storedPassword.equals(request.getPassword())) {
            log.info("Login successful for email: {}", request.getUserEmail());

            String newOtp = String.valueOf(generateOtp());
            long expiryTime = Instant.now().plus(propertiesConfig.getOtpExpiryMinutes(), ChronoUnit.MINUTES).getEpochSecond();

            jdbcTemplate.update(propertiesConfig.getUserUpdateOtpQuery(), newOtp, expiryTime, request.getUserEmail());

            log.info("New OTP generated and stored for email: {}", request.getUserEmail());

            String token = JwtTokenUtil.generateToken(request.getUserEmail(), Collections.singletonList(propertiesConfig.getUserRole()));
            log.info("Generated Token: {}", token);

            return new ResponseEntity<>(ResponseBuilder.createSuccessResponse(new LoginResponse(token, Constants.SUCCESS)), HttpStatus.OK);
        } else {
            log.warn("Password does not match for email: {}", request.getUserEmail());
            return new ResponseEntity<>(ResponseBuilder.createFailureResponse(String.valueOf(InvoiceErrorMessageKey.INVALID_Email_PASSWORD)), HttpStatus.UNAUTHORIZED);
        }
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
        return (int) (Math.random() * 900000) + 100000; // Generates a 6-digit OTP
    }

    @Override
    public ResponseEntity<?> validateOtp(OtpRequest request) throws InvoiceException {
        return validateOtpForUser(request.getUserEmail(), Math.toIntExact(request.getOtp()));
    }

    @Override
    public ResponseEntity<?> validateCompanyOtp(CompanyOtpRequest request) throws InvoiceException {
        return validateOtpForCompany(request.getCompanyEmail(), Math.toIntExact(request.getOtp()));
    }

    private ResponseEntity<?> validateOtpForUser(String email, int otp) throws InvoiceException {
        Map<String, Object> user = fetchUserByEmail(email);
        if (user == null) {
            throw new InvoiceException(InvoiceErrorMessageHandler.getMessage(InvoiceErrorMessageKey.USER_NOT_FOUND), HttpStatus.NOT_FOUND);
        }

        return validateOtpAndClear(email, otp, Constants.USER);
    }

    private ResponseEntity<?> validateOtpForCompany(String email, int otp) throws InvoiceException {
        Map<String, Object> company = fetchCompanyByEmail(email);
        if (company == null) {
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
                throw new InvoiceException(propertiesConfig.getOtpInvalidMessage(), HttpStatus.FORBIDDEN);
            }
            if (expiryTime == null) {
                throw new InvoiceException(propertiesConfig.getOtpExpiredMessage(), HttpStatus.FORBIDDEN);
            }

            if (Instant.now().getEpochSecond() > expiryTime) {
                throw new InvoiceException(propertiesConfig.getOtpExpiredMessage(), HttpStatus.FORBIDDEN);
            }
            String clearOtpSql = type.equals(Constants.USER) ? propertiesConfig.getUserNullOtpQuery(): propertiesConfig.getCompanyNullOtpQuery();
            jdbcTemplate.update(clearOtpSql, email);

            return ResponseEntity.ok(ResponseBuilder.createSuccessResponse(Constants.SUCCESS));
        } else {
            throw new InvoiceException(propertiesConfig.getOtpNotFoundMessage(), HttpStatus.FORBIDDEN);
        }
    }

    @Override
    public ResponseEntity<?> updateCompanyPassword(CompanyPasswordUpdate request) throws InvoiceException {
        log.info("Attempting to update password for company with email: {}", request.getCompanyEmail());

        Map<String, Object> company = fetchCompanyByEmail(request.getCompanyEmail());
        if (company == null) {
            log.warn("Company not found for email: {}", request.getCompanyEmail());
            return new ResponseEntity<>(ResponseBuilder.createFailureResponse(String.valueOf(InvoiceErrorMessageKey.INVALID_Email)), HttpStatus.NOT_FOUND);
        }

        String storedPassword = (String) company.get("password");

        jdbcTemplate.update(propertiesConfig.getCompanyUpdatePasswordQuery(), request.getNewPassword(), request.getCompanyEmail());
        log.info("Password updated successfully for company with email: {}", request.getCompanyEmail());


        String newOtp = String.valueOf(generateOtp());
        long expiryTime = Instant.now().plus(propertiesConfig.getOtpExpiryMinutes(), ChronoUnit.MINUTES).getEpochSecond();
        jdbcTemplate.update(propertiesConfig.getCompanyUpdateOtpQuery(), newOtp, expiryTime, request.getCompanyEmail());
        log.info("New OTP generated and stored for company with email: {}", request.getCompanyEmail());

        String token = JwtTokenUtil.generateToken(request.getCompanyEmail(), Collections.singletonList(propertiesConfig.getCompanyRole()));
        log.info("Generated Token: {}", token);

        return new ResponseEntity<>(ResponseBuilder.createSuccessResponse(new LoginResponse(token, Constants.SUCCESS)), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> updateUserPassword(Passwordforgot request) throws InvoiceException {
        log.info("Attempting to update password for email: {}", request.getUserEmail());

        Map<String, Object> user = fetchUserByEmail(request.getUserEmail());
        if (user == null) {
            log.warn("User not found for email: {}", request.getUserEmail());
            return new ResponseEntity<>(ResponseBuilder.createFailureResponse(String.valueOf(InvoiceErrorMessageKey.INVALID_Email)), HttpStatus.NOT_FOUND);
        }

        String storedPassword = (String) user.get(Constants.Password);

        jdbcTemplate.update(propertiesConfig.getUserUpdatePasswordQuery(), request.getNewPassword(), request.getUserEmail());
        log.info("Password updated successfully for email: {}", request.getUserEmail());
        String newOtp = String.valueOf(generateOtp());
        long expiryTime = Instant.now().plus(propertiesConfig.getOtpExpiryMinutes(), ChronoUnit.MINUTES).getEpochSecond();

        jdbcTemplate.update(propertiesConfig.getUserUpdateOtpQuery(), newOtp, expiryTime, request.getUserEmail());
        log.info("New OTP generated and stored for email: {}", request.getUserEmail());

        String token = JwtTokenUtil.generateToken(request.getUserEmail(), Collections.singletonList(propertiesConfig.getUserRole()));
        log.info("Generated Token: {}", token);

        return new ResponseEntity<>(ResponseBuilder.createSuccessResponse(new LoginResponse(token, Constants.SUCCESS)), HttpStatus.OK);
    }
}
