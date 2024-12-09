package com.invoicelogin.service;

import com.invoicelogin.exceptions.InvoiceException;
import com.invoicelogin.request.*;
import org.springframework.http.ResponseEntity;

public interface LoginService {

    ResponseEntity<?> login(AdminLoginRequest request) throws InvoiceException;

    ResponseEntity<?> companyLogin(CompanyLoginRequest login) throws InvoiceException;

    ResponseEntity<?> UserLogin(UserLoginRequest request) throws InvoiceException;

    ResponseEntity<?> validateOtp(UserOtpRequest request) throws InvoiceException;

    ResponseEntity<?> validateCompanyOtp(CompanyOtpRequest request) throws InvoiceException;

    ResponseEntity<?> updateCompanyPassword(CompanyPassword request) throws InvoiceException;

    ResponseEntity<?> updateUserPassword(UserPassword request) throws InvoiceException;

    ResponseEntity<?> forgotCompanyPassword(CompanyPassword request) throws InvoiceException;

    ResponseEntity<?> forgotUserPassword(UserPassword request) throws InvoiceException;
}
