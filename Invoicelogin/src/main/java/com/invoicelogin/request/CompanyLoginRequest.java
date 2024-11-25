package com.invoicelogin.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class CompanyLoginRequest {
    @NotEmpty(message = "{company.companyEmail.message}")
    @Email(message = "{company.companyEmail.invalid}")
    @Schema(required = true, description = "${login.companyEmail.description}", example = "user@example.com")
    @JsonProperty("companyEmail")
    private String companyEmail;

    @NotEmpty(message = "{user.password.message}")
    @Schema(required = true, description = "${login.password.description}", example = "Password123!")
    @JsonProperty("password")
    private String password;
}
