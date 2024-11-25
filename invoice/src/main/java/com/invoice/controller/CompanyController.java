package com.invoice.controller;

import com.invoice.exception.InvoiceException;
import com.invoice.request.CompanyRequest;
import com.invoice.service.CompanyService;
import com.invoice.util.Constants;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/company") // Maps all methods in the class to URLs starting with /company
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @PostMapping("")
    @Operation(security = { @SecurityRequirement(name = Constants.AUTH_KEY) }, summary = "${api.createCompany.tag}", description = "${api.createCompany.description}")
    @ResponseStatus(HttpStatus.CREATED)
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Company created successfully")
    public ResponseEntity<?> createCompany(@Parameter(hidden = true, required = true, description = "${apiAuthToken.description}", example = "Bearer abcdef12-1234-1234-1234-abcdefabcdef")
                                           @RequestHeader(Constants.AUTH_KEY) String authToken,
                                           @Parameter(required = true, description = "${api.createCompanyPayload.description}")
                                           @RequestBody @Valid CompanyRequest companyRequest) throws InvoiceException {
        return companyService.createCompany(companyRequest);
    }

    @GetMapping("/{companyId}")
    @Operation(security = { @SecurityRequirement(name = Constants.AUTH_KEY) }, summary = "${api.getCompany.tag}", description = "${api.getCompany.description}")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Company retrieved successfully")
    public ResponseEntity<?> getCompany(@Parameter(hidden = true, required = true, description = "${apiAuthToken.description}", example = "Bearer abcdef12-1234-1234-1234-abcdefabcdef")
                                        @RequestHeader(Constants.AUTH_KEY) String authToken,
                                        @PathVariable Long companyId) throws InvoiceException {
        return companyService.getCompany(companyId);
    }

    @GetMapping("/all")
    @Operation(security = { @SecurityRequirement(name = Constants.AUTH_KEY) }, summary = "${api.getAllCompanies.tag}", description = "${api.getAllCompanies.description}")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Companies retrieved successfully")
    public ResponseEntity<?> getAllCompanies(@Parameter(hidden = true, required = true, description = "${apiAuthToken.description}", example = "Bearer abcdef12-1234-1234-1234-abcdefabcdef")
                                             @RequestHeader(Constants.AUTH_KEY) String authToken) throws InvoiceException {
        return companyService.getAllCompanies();
    }

    @PatchMapping("/{companyId}")
    @Operation(security = { @SecurityRequirement(name = Constants.AUTH_KEY) }, summary = "${api.updateCompany.tag}", description = "${api.updateCompany.description}")
    @ResponseStatus(HttpStatus.OK)
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Company updated successfully")
    public ResponseEntity<?> updateCompany(@Parameter(hidden = true, required = true, description = "${apiAuthToken.description}", example = "Bearer abcdef12-1234-1234-1234-abcdefabcdef")
                                           @RequestHeader(Constants.AUTH_KEY) String authToken,
                                           @PathVariable Long companyId,
                                           @RequestBody @Valid CompanyRequest companyRequest) throws InvoiceException, IOException {
        return companyService.updateCompany((companyId), companyRequest);
    }

    @DeleteMapping("/{companyId}")
    @Operation(security = { @SecurityRequirement(name = Constants.AUTH_KEY) }, summary = "${api.deleteCompany.tag}", description = "${api.deleteCompany.description}")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Company deleted successfully")
    public ResponseEntity<?> deleteCompany(@Parameter(hidden = true, required = true, description = "${apiAuthToken.description}", example = "Bearer abcdef12-1234-1234-1234-abcdefabcdef")
                                           @RequestHeader(Constants.AUTH_KEY) String authToken,
                                           @PathVariable Long companyId) throws InvoiceException {

        return companyService.deleteCompany(companyId);
    }

}
