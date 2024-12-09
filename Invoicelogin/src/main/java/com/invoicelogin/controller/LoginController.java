package com.invoicelogin.controller;

import com.invoicelogin.common.ResponseObject;
import com.invoicelogin.config.SwaggerConfig;
import com.invoicelogin.exceptions.InvoiceException;
import com.invoicelogin.request.UserLoginRequest;
import com.invoicelogin.request.*;
import com.invoicelogin.service.LoginService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@Slf4j
@CrossOrigin(origins = "*")
@RequestMapping("/")
@io.swagger.v3.oas.annotations.tags.Tag(name = SwaggerConfig.INVOICE_TAG)
@io.swagger.v3.oas.annotations.responses.ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(content = @io.swagger.v3.oas.annotations.media.Content(schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = ResponseObject.class)), responseCode = "400", description = "The request is malformed or invalid."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(content = @io.swagger.v3.oas.annotations.media.Content(schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = ResponseObject.class)), responseCode = "403", description = "The user does not have the necessary privileges to perform the operation."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(content = @io.swagger.v3.oas.annotations.media.Content(schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = ResponseObject.class)), responseCode = "500", description = "An internal server error occurred."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(content = @io.swagger.v3.oas.annotations.media.Content(schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = ResponseObject.class)), responseCode = "503", description = "A service is unreachable."),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(content = @io.swagger.v3.oas.annotations.media.Content(schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = ResponseObject.class)), responseCode = "504", description = "Gateway Timeout Error"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "202", content = @io.swagger.v3.oas.annotations.media.Content(schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = ResponseObject.class)))
})
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("admin/login")
    @io.swagger.v3.oas.annotations.Operation(summary = "${api.login.tag}", description = "${api.login.description}")
    @ResponseStatus(HttpStatus.OK)
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "OK")
    public ResponseEntity<?> login(@RequestBody @Valid AdminLoginRequest request) throws Exception {
        return loginService.login(request);
    }

    @PostMapping("company/login")
    @io.swagger.v3.oas.annotations.Operation(summary = "${api.companyLogin.tag}", description = "${api.companyLogin.description}")
    @ResponseStatus(HttpStatus.CREATED)
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "CREATED")
    public ResponseEntity<?> companyLogin(@RequestBody @Valid CompanyLoginRequest login) throws Exception {
        return loginService.companyLogin(login);
    }

    @PostMapping("user/login")
    @io.swagger.v3.oas.annotations.Operation(summary = "${api.updatePassword.tag}", description = "${api.updatePassword.description}")
    @ResponseStatus(HttpStatus.OK)
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "OK")
    public ResponseEntity<?> userLogin(@RequestBody @Valid UserLoginRequest request) throws InvoiceException {
        return loginService.UserLogin(request);
    }


    @PostMapping("validate/userOtp")
    @io.swagger.v3.oas.annotations.Operation(summary = "${api.userOtpValidate.tag}", description = "${api.otpValidate.description}")
    @ResponseStatus(HttpStatus.OK)
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "OK")
    public ResponseEntity<?> validateOtp(@RequestBody @Valid UserOtpRequest request) throws InvoiceException {
        return loginService.validateOtp(request);
    }

    @PostMapping("validate/companyOtp")
    @io.swagger.v3.oas.annotations.Operation(summary = "${api.companyOtpValidate.tag}", description = "${api.otpValidate.description}")
    @ResponseStatus(HttpStatus.OK)
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "OK")
    public ResponseEntity<?> validateCompanyOtp(@RequestBody @Valid CompanyOtpRequest request) throws InvoiceException {
        return loginService.validateCompanyOtp(request);
    }

    @PatchMapping("userPassword")
    @io.swagger.v3.oas.annotations.Operation(summary = "${api.updateForgotPassword.tag}", description = "${api.updateForgotPassword.description}")
    @ResponseStatus(HttpStatus.CREATED)
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "CREATED")
    public ResponseEntity<?> updateUserPassword(@RequestBody @Valid UserPassword request) throws InvoiceException {
        return loginService.updateUserPassword(request);
    }

    @PatchMapping("companyPassword")
    @io.swagger.v3.oas.annotations.Operation(summary = "${api.updateForgotPassword.tag}", description = "${api.updateForgotPassword.description}")
    @ResponseStatus(HttpStatus.CREATED)
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "CREATED")
    public ResponseEntity<?> updateCompanyPassword(@RequestBody @Valid CompanyPassword request) throws InvoiceException {
        return loginService.updateCompanyPassword(request);
    }

    @PatchMapping("user/forgotPassword")
    @io.swagger.v3.oas.annotations.Operation(summary = "${api.updateForgotPassword.tag}", description = "${api.updateForgotPassword.description}")
    @ResponseStatus(HttpStatus.CREATED)
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "CREATED")
    public ResponseEntity<?> forgotUserPassword(@RequestBody @Valid UserPassword request) throws InvoiceException {
        return loginService.forgotUserPassword(request);
    }
    @PatchMapping("company/forgotPassword")
    @io.swagger.v3.oas.annotations.Operation(summary = "${api.updateForgotPassword.tag}", description = "${api.updateForgotPassword.description}")
    @ResponseStatus(HttpStatus.CREATED)
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "CREATED")
    public ResponseEntity<?> forgotCompanyPassword(@RequestBody @Valid CompanyPassword request) throws InvoiceException {
        return loginService.forgotCompanyPassword(request);
    }
}
