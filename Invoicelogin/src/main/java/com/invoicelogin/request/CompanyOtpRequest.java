package com.invoicelogin.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class CompanyOtpRequest {
    @Schema(required = true, description = "${login.otp.description}", example = "123456")
    private Long otp;

    @NotEmpty(message = "{companyEmail.message}")
    @Schema(required = true, description = "${login.companyEmail.description}", example = "path@gmail.com")
    private String companyEmail;
}
