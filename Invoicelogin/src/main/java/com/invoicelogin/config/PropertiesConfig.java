package com.invoicelogin.config;

import lombok.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Configuration
public class PropertiesConfig {

    @Value("${sql.user.select}")
    private String userSelectQuery;

    @Value("${sql.company.select}")
    private String companySelectQuery;

    @Value("${sql.user.updateOtp}")
    private String userUpdateOtpQuery;//sql.user.updateOtp

    @Value("${sql.company.updateOtp}")
    private String companyUpdateOtpQuery;

    @Value("${otp.expiry.minutes}")
    private long otpExpiryMinutes;

    @Value("${role.user}")
    private String userRole;

    @Value("${role.company}")
    private String companyRole;

    @Value("${role.admin}")
    private String adminRole;

    @Value("${invoice.admin}")
    private String admin;

    @Value("${invoice.password}")
    private String adminPassword;

    @Value("${otp.invalid}")
    private String otpInvalidMessage;

    @Value("${otp.expired}")
    private String otpExpiredMessage;

    @Value("${otp.notFound}")
    private String otpNotFoundMessage;

    @Value("${sql.user.selectOtp}")
    private String userSelectOtpQuery;

    @Value("${sql.company.selectOtp}")
    private String companySelectOtpQuery;

    @Value("${sql.user.updatePassword}")
    private String userUpdatePasswordQuery;

    @Value("${sql.company.updatePassword}")
    private String companyUpdatePasswordQuery;

    @Value("${password.updated}")
    private String passwordUpdatedMessage;

    @Value("${sql.user.nullOtp}")
    public String UserNullOtpQuery;

    @Value("${sql.company.nullOtp}")
    public String CompanyNullOtpQuery;

}
