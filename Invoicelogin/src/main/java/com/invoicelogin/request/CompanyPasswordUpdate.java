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
public class CompanyPasswordUpdate {

    @NotEmpty(message = "{user.companyEmail.message}")
    @Schema(required = true, description = "${login.companyEmail.description}", example = "admin")
    @JsonProperty("companyEmail")
    private String companyEmail;

    @NotEmpty(message = "{user.newPassword.message}")
    @Schema(required = true, description = "${login.newPassword.description}", example = "newPassword")
    @JsonProperty("newPassword")
    private String newPassword;
}
