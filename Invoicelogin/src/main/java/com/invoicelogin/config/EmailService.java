package com.invoicelogin.config;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Getter
@Service
public class EmailService {

    @Value("${email.otp.body}")
    private String otpEmailBodyTemplate;

    // Method to get the subject of the OTP email
    @Getter
    @Value("${email.otp.subject}")
    private String otpEmailSubject;

    // Method to build the OTP email content
    public String buildOtpEmailContent(String otp, int validMinutes) {
        // Use String.format to replace placeholders in the template
        return String.format(otpEmailBodyTemplate, otp, validMinutes);
    }

}
