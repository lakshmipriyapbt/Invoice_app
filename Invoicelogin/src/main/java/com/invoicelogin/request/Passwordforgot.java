package com.invoicelogin.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class Passwordforgot {

    @NotEmpty(message = "{user.username.message}")
    @Schema(required = true, description = "${login.userEmail.description}", example = "admin")
    @JsonProperty("userEmail")
    private String userEmail;

    @NotEmpty(message = "{user.password.message}")
    @Schema(required = true, description = "${login.newPassword.description}", example = "newPassword")
    @JsonProperty("newPassword")
    private String newPassword;
}
