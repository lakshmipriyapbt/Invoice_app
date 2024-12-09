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
public class UserOtpRequest {

    @Schema(required = true, description = "${login.otp.description}", example = "123456")
    private Long otp;

    @NotEmpty(message = "{user.userEmail.message}")
    @Schema(required = true, description = "${login.userEmail.description}", example = "path@gmail.com")
    private String userEmail;
}
