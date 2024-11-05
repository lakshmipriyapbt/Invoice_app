package com.invoice.controller;

import com.invoice.exception.InvoiceException;
import com.invoice.model.InvoiceModel;
import com.invoice.request.InvoiceRequest;
import com.invoice.service.InvoiceService;
import com.invoice.util.Constants;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/invoice") // Maps all methods in the class to URLs starting with /invoice
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @PostMapping("create")
    @Operation(security = { @SecurityRequirement(name = Constants.AUTH_KEY) },summary = "${api.createInvoice.tag}", description = "${api.createInvoice.description}")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponse(responseCode = "201", description = "Invoice created successfully")
    public ResponseEntity<?> createInvoice(@Parameter(hidden = true, required = true, description = "${apiAuthToken.description}", example = "Bearer abcdef12-1234-1234-1234-abcdefabcdef") @RequestHeader(Constants.AUTH_KEY) String authToken,
                                           @Parameter(required = true, description = "${api.createInvoicePayload.description}")
                                           @RequestBody @Valid InvoiceModel invoiceRequest) throws InvoiceException {
        return invoiceService.createInvoice(invoiceRequest);
    }

    @GetMapping("/{invoiceId}")
    @Operation(security = { @SecurityRequirement(name = Constants.AUTH_KEY) },summary = "${api.getInvoice.tag}", description = "${api.getInvoice.description}")
    @ApiResponse(responseCode = "200", description = "Invoice retrieved successfully")
    public ResponseEntity<?> getInvoice(@Parameter(hidden = true, required = true, description = "${apiAuthToken.description}", example = "Bearer abcdef12-1234-1234-1234-abcdefabcdef") @RequestHeader(Constants.AUTH_KEY) String authToken,
                                        @PathVariable String invoiceId) throws InvoiceException {
        return invoiceService.getInvoice(invoiceId);
    }

    @GetMapping("/all")
    @Operation(security = { @SecurityRequirement(name = Constants.AUTH_KEY) },summary = "${api.getAllInvoices.tag}", description = "${api.getAllInvoices.description}")
    @ApiResponse(responseCode = "200", description = "Invoices retrieved successfully")
    public ResponseEntity<?> getAllInvoices(@Parameter(hidden = true, required = true, description = "${apiAuthToken.description}", example = "Bearer abcdef12-1234-1234-1234-abcdefabcdef") @RequestHeader(Constants.AUTH_KEY) String authToken) throws InvoiceException {
        return invoiceService.getAllInvoices();
    }

    @PatchMapping("/{invoiceId}")
    @Operation(security = { @SecurityRequirement(name = Constants.AUTH_KEY) },summary = "${api.updateInvoice.tag}", description = "${api.updateInvoice.description}")
    @ResponseStatus(HttpStatus.OK)
    @ApiResponse(responseCode = "200", description = "Invoice updated successfully")
    public ResponseEntity<?> updateInvoice(@Parameter(hidden = true, required = true, description = "${apiAuthToken.description}", example = "Bearer abcdef12-1234-1234-1234-abcdefabcdef") @RequestHeader(Constants.AUTH_KEY) String authToken,
                                           @PathVariable String invoiceId,
                                           @RequestBody @Valid InvoiceModel invoiceRequest) throws InvoiceException, IOException {
        return invoiceService.updateInvoice(invoiceId, invoiceRequest);
    }

    @DeleteMapping("/{invoiceId}")
    @Operation(security = { @SecurityRequirement(name = Constants.AUTH_KEY) },summary = "${api.deleteInvoice.tag}", description = "${api.deleteInvoice.description}")
    @ApiResponse(responseCode = "200", description = "Invoice deleted successfully")
    public ResponseEntity<?> deleteInvoice(@Parameter(hidden = true, required = true, description = "${apiAuthToken.description}", example = "Bearer abcdef12-1234-1234-1234-abcdefabcdef") @RequestHeader(Constants.AUTH_KEY) String authToken,
                                           @PathVariable String invoiceId) throws InvoiceException {
        return invoiceService.deleteInvoice(invoiceId);
    }

}
