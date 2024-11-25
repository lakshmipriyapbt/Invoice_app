package com.invoicelogin.request;

import com.fasterxml.jackson.annotation.JsonProperty;
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
public class UserPassword {

    @NotEmpty(message = "{user.userEmail.message}")
    @Schema(required = true, description = "${login.userEmail.description}", example = "admin")
    @JsonProperty("userEmail")
    private String userEmail;

    @NotEmpty(message = "{user.password.message}")
    @Schema(required = true, description = "${login.newPassword.description}", example = "newPassword")
    @JsonProperty("newPassword")
    private String newPassword;

    @NotEmpty(message = "{user.ConfirmPassword.message}")
    @Schema(required = true, description = "${login.confirmPassword.description}", example = "confirmPassword")
    @JsonProperty("confirmPassword")
    private String confirmPassword;
}
