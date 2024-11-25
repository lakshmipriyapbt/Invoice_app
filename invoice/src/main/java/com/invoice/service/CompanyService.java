package com.invoice.service;

import com.invoice.exception.InvoiceException;
import com.invoice.request.CompanyRequest;
import org.springframework.http.ResponseEntity;

import java.io.IOException;

public interface CompanyService {

    ResponseEntity<?> createCompany(CompanyRequest companyRequest) throws InvoiceException;

    ResponseEntity<?> getCompany(Long companyId) throws InvoiceException;

    ResponseEntity<?> getAllCompanies() throws InvoiceException;

    ResponseEntity<?> deleteCompany(Long companyId) throws InvoiceException;

    ResponseEntity<?> updateCompany(Long companyId, CompanyRequest companyRequest) throws IOException, InvoiceException;

}
