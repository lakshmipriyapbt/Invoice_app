package com.invoice.serviceImpl;

import com.invoice.exception.InvoiceErrorMessageKey;
import com.invoice.exception.InvoiceException;
import com.invoice.mappers.CompanyMapper;
import com.invoice.model.CompanyModel;
import com.invoice.repository.CompanyRepository;
import com.invoice.request.CompanyRequest;
import com.invoice.service.CompanyService;
import com.invoice.common.ResponseBuilder;
import com.invoice.util.Constants;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import java.util.*;

@Service
@Slf4j
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository repository;

    @Autowired
    private CompanyMapper companyMapper;

    @Autowired
    public CompanyServiceImpl(CompanyRepository repository) {
        this.repository = repository;
    }

    @Override
    @Transactional
    public ResponseEntity<?> createCompany(CompanyRequest companyRequest) throws InvoiceException {
        log.info("Attempting to create a new company with name: {}", companyRequest.getCompanyName());
        try {
            if (repository.existsByCompanyName(companyRequest.getCompanyName()) ||
                    repository.existsByCompanyEmail(companyRequest.getCompanyEmail()) ||
                    repository.existsByGstNumber(companyRequest.getGstNumber())) {

                log.error("Company creation failed: Name '{}', Email '{}', or GST Number '{}' already exists.", companyRequest.getCompanyName(), companyRequest.getCompanyEmail(), companyRequest.getGstNumber());
                throw new InvoiceException(InvoiceErrorMessageKey.COMPANY_NAME_OR_EMAIL_EXISTS, HttpStatus.BAD_REQUEST);
            }
            log.debug("Creating a new company record for name: {}", companyRequest.getCompanyName());
            CompanyModel company = new CompanyModel();
            company.setUserName(companyRequest.getUserName());
            company.setServiceName(companyRequest.getServiceName());
            company.setCompanyEmail(companyRequest.getCompanyEmail());
            company.setPassword(companyRequest.getPassword());
            company.setPhone(companyRequest.getPhone());
            company.setCompanyName(companyRequest.getCompanyName());
            company.setPan(companyRequest.getPan());
            company.setGstNumber(companyRequest.getGstNumber());
            company.setGender(companyRequest.getGender());
            company.setStampAndSign(companyRequest.getStampAndSign());
            company.setAccountNumber(companyRequest.getAccountNumber());
            company.setBankName(companyRequest.getBankName());
            company.setBranch(companyRequest.getBranch());
            company.setIfscCode(companyRequest.getIfscCode());
            company.setAddress(companyRequest.getAddress());
            company.setState(companyRequest.getState());
            company.setDeleted(false);
            CompanyModel savedCompany = repository.save(company);
            log.info("Company created successfully with ID: {}", savedCompany.getCompanyId());

            Map<String, Object> responseMap = new HashMap<>();
            responseMap.put(Constants.COMPANY_ID, savedCompany.getCompanyId());
            responseMap.put(Constants.COMPANY_NAME, savedCompany.getCompanyName());
            responseMap.put(Constants.COMPANY_EMAIL, savedCompany.getCompanyEmail());
            responseMap.put(Constants.PHONE, savedCompany.getPhone());
            log.debug("Company creation response: {}", responseMap);
            return new ResponseEntity<>(ResponseBuilder.builder().build().createSuccessResponse(Constants.COMPANY_CREATED_SUCCESS), HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error occurred while creating company: {}", e.getMessage(), e);
            throw new InvoiceException(InvoiceErrorMessageKey.ERROR_CREATING_COMPANY + e.getMessage(), e);
        }
    }

    @Override
    public ResponseEntity<?> getCompany(Long companyId) throws InvoiceException {
        log.info("Attempting to fetch company with ID: {}", companyId);
        try {
            Optional<CompanyModel> company = repository.findById(companyId);
            if (repository.existsById(companyId)) {
                CompanyModel companyData = company.get();
                companyData.setInvoices(null);
                log.info("Successfully fetched company with ID: {}", companyId);
                return new ResponseEntity<>(ResponseBuilder.builder().build().createSuccessResponse(companyData), HttpStatus.OK);
            } else {
                log.error("Company with ID {} not found.", companyId);
                throw new InvoiceException(InvoiceErrorMessageKey.COMPANY_NOT_FOUND, HttpStatus.NOT_FOUND);
            }
        }  catch (Exception e) {
            log.error("Unexpected error occurred while fetching company with ID {}: {}", companyId, e.getMessage(), e);
            throw new InvoiceException(InvoiceErrorMessageKey.ERROR_FETCHING_COMPANY + e.getMessage(), e);
        }
    }

    @Override
    public ResponseEntity<?> getAllCompanies() throws InvoiceException {
        log.info("Fetching all companies");
        try {
            List<CompanyModel> companies = repository.findAll();
            if (companies == null || companies.isEmpty()) {
                log.info("No company found in the database.");
                return ResponseEntity.ok(Collections.emptyList());
            }
            companies.forEach(company -> company.setInvoices(null));
            log.info("All companies fetched successfully, total count: {}", companies.size());
            return new ResponseEntity<>(ResponseBuilder.builder().build().createSuccessResponse(companies), HttpStatus.OK);
        } catch (Exception e) {
            log.error("An error occurred while fetching all companies: {}", e.getMessage(), e);
            throw new InvoiceException(InvoiceErrorMessageKey.INTERNAL_SERVER_ERROR.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> deleteCompany(Long companyId) throws InvoiceException {
        log.debug("Attempting to delete company with ID: {}", companyId);
        try {
            Optional<CompanyModel> companyOpt = repository.findById(companyId);
            if (companyOpt.isPresent()) {
                CompanyModel company = companyOpt.get();
                repository.delete(company);
                log.info("Company with ID {} deleted successfully.", companyId);
                return new ResponseEntity<>(ResponseBuilder.builder().build().createSuccessResponse(Constants.DELETE_SUCCESS), HttpStatus.OK);
            } else {
                log.error("Company with ID {} not found.", companyId);
                throw new InvoiceException(InvoiceErrorMessageKey.COMPANY_NOT_FOUND, HttpStatus.NOT_FOUND);
            }
        }  catch (Exception e) {
            log.error("Unexpected error occurred while deleting company with ID {}: {}", companyId, e.getMessage(), e);
            throw new InvoiceException(InvoiceErrorMessageKey.ERROR_DELETING_COMPANY + e.getMessage(), e);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> updateCompany(Long companyId, @Valid CompanyRequest companyRequest) throws InvoiceException {
        log.info("Updating company with ID: {}", companyId);
        CompanyModel companyToUpdate = repository.findById((companyId))
                .orElseThrow(() -> new InvoiceException(InvoiceErrorMessageKey.COMPANY_NOT_FOUND, HttpStatus.NOT_FOUND));
        if (companyRequest.getCompanyEmail() != null && !companyRequest.getCompanyEmail().equals(companyToUpdate.getCompanyEmail())) {
            if (repository.existsByCompanyEmail(companyRequest.getCompanyEmail())) {
                log.error("Email already exists: {}", companyRequest.getCompanyEmail());
                throw new InvoiceException(InvoiceErrorMessageKey.EMAIL_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
            }
            companyToUpdate.setCompanyEmail(companyRequest.getCompanyEmail());
        }
        if (companyRequest.getUserName() != null) {
            companyToUpdate.setUserName(companyRequest.getUserName());
        }
        if (companyRequest.getCompanyEmail() != null) {
            companyToUpdate.setCompanyEmail(companyRequest.getCompanyEmail());
        }
        if (companyRequest.getServiceName() != null) {
            companyToUpdate.setServiceName(companyRequest.getServiceName());
        }
        if (companyRequest.getPassword() != null) {
            companyToUpdate.setPassword(companyRequest.getPassword());
        }
        if (companyRequest.getPhone() != null) {
            companyToUpdate.setPhone(companyRequest.getPhone());
        }
        if (companyRequest.getCompanyName() != null) {
            companyToUpdate.setCompanyName(companyRequest.getCompanyName());
        }
        if (companyRequest.getPan() != null) {
            companyToUpdate.setPan(companyRequest.getPan());
        }
        if (companyRequest.getGstNumber() != null) {
            companyToUpdate.setGstNumber(companyRequest.getGstNumber());
        }
        if (companyRequest.getGender() != null) {
            companyToUpdate.setGender(companyRequest.getGender());
        }
        if (companyRequest.getStampAndSign() != null) {
            companyToUpdate.setStampAndSign(companyRequest.getStampAndSign());
        }
        if (companyRequest.getAccountNumber() != null) {
            companyToUpdate.setAccountNumber(companyRequest.getAccountNumber());
        }
        if (companyRequest.getBankName() != null) {
            companyToUpdate.setBankName(companyRequest.getBankName());
        }
        if (companyRequest.getBranch() != null) {
            companyToUpdate.setBranch(companyRequest.getBranch());
        }
        if (companyRequest.getIfscCode() != null) {
            companyToUpdate.setIfscCode(companyRequest.getIfscCode());
        }
        if (companyRequest.getAddress() != null) {
            companyToUpdate.setAddress(companyRequest.getAddress());
        }
        if (companyRequest.getState() != null) {
            companyToUpdate.setState(companyRequest.getState());
        }
        repository.save(companyToUpdate);
        log.info("Company updated successfully with ID: {}", companyId);
        return new ResponseEntity<>(ResponseBuilder.builder().build().createSuccessResponse(Constants.UPDATE_SUCCESS), HttpStatus.OK);
    }
}
