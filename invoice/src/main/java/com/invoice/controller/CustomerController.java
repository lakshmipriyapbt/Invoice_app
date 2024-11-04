package com.invoice.controller;

import com.invoice.exception.InvoiceException;
import com.invoice.request.CustomerRequest;
import com.invoice.service.CustomerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/customer") // Maps all methods in the class to URLs starting with /customer
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping("create")
    @Operation(summary = "${api.createCustomer.tag}", description = "${api.createCustomer.description}")
    @ResponseStatus(HttpStatus.CREATED)
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "201", description = "Customer created successfully")
    public ResponseEntity<?> createCustomer(@Parameter(required = true, description = "${api.createCustomerPayload.description}")
                                            @RequestBody @Valid CustomerRequest customerRequest) throws InvoiceException {
        return customerService.createCustomer(customerRequest);
    }

    @GetMapping("/{customerId}")
    @Operation(summary = "${api.getCustomer.tag}", description = "${api.getCustomer.description}")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Customer retrieved successfully")
    public ResponseEntity<?> getCustomer(@PathVariable String customerId) throws InvoiceException {
        return customerService.getCustomer(customerId);
    }

    @GetMapping("/all")
    @Operation(summary = "${api.getAllCustomers.tag}", description = "${api.getAllCustomers.description}")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Customers retrieved successfully")
    public ResponseEntity<?> getAllCustomers() throws InvoiceException {
        return customerService.getAllCustomers();
    }

    @PatchMapping("/{customerId}")
    @Operation(summary = "${api.updateCustomer.tag}", description = "${api.updateCustomer.description}")
    @ResponseStatus(HttpStatus.OK)
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Customer updated successfully")
    public ResponseEntity<?> updateCustomer(@PathVariable String customerId,
                                            @RequestBody @Valid CustomerRequest customerRequest) throws InvoiceException, IOException {
        return customerService.updateCustomer(customerId, customerRequest);
    }

    @DeleteMapping("/{customerId}")
    @Operation(summary = "${api.deleteCustomer.tag}", description = "${api.deleteCustomer.description}")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Customer deleted successfully")
    public ResponseEntity<?> deleteCustomer(@PathVariable String customerId) throws InvoiceException {
        return customerService.deleteCustomer(customerId);
    }
}
