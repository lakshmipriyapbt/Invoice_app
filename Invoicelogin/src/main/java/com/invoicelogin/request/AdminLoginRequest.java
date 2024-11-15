package com.invoicelogin.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class AdminLoginRequest {

    @Schema(required = true, description = "${login.userName.description}", example = "admin")
    @JsonProperty("userName")
    private String userName;

    @NotEmpty(message = "{user.password}")
    @Schema(required = true, description = "${login.password.description}", example = "password")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W)(?!.* ).{6,16}$", message = "{invalid.password}")
    @JsonProperty("password")
    private String password;
}







