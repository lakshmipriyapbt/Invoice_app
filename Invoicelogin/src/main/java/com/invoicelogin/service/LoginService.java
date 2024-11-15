package com.invoicelogin.service;

import com.invoicelogin.exceptions.InvoiceException;
import com.invoicelogin.request.*;
import org.springframework.http.ResponseEntity;

public interface LoginService {

    ResponseEntity<?> login(AdminLoginRequest request) throws InvoiceException;

    ResponseEntity<?> companyLogin(CompanyLoginRequest login) throws InvoiceException;

    ResponseEntity<?> UserLogin(UserLoginRequest request) throws InvoiceException;

    ResponseEntity<?> validateOtp(OtpRequest request) throws InvoiceException;

    ResponseEntity<?> validateCompanyOtp(CompanyOtpRequest request) throws InvoiceException;

    ResponseEntity<?> updateCompanyPassword(CompanyPasswordUpdate request) throws InvoiceException;

    ResponseEntity<?> updateUserPassword(Passwordforgot request) throws InvoiceException;
}
