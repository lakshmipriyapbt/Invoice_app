package com.invoice.serviceImpl;

import com.invoice.common.ResponseBuilder;
import com.invoice.exception.InvoiceErrorMessageKey;
import com.invoice.exception.InvoiceException;
import com.invoice.mappers.CustomerMapper;
import com.invoice.model.CustomerModel;
import com.invoice.repository.CustomerRepository;
import com.invoice.request.CustomerRequest;
import com.invoice.service.CustomerService;
import com.invoice.util.Constants;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository repository;
    private final CustomerMapper customerMapper;

    @Autowired
    public CustomerServiceImpl(CustomerRepository repository, CustomerMapper customerMapper) {
        this.repository = repository;
        this.customerMapper = customerMapper;
    }

    @Override
    public ResponseEntity<?> createCustomer(CustomerRequest customerRequest) throws InvoiceException {
        log.debug("Creating customer: {}", customerRequest);
        try {
            if (repository.existsByEmail(customerRequest.getEmail())) {
                log.error("Email already exists: {}", customerRequest.getEmail());
                throw new InvoiceException(InvoiceErrorMessageKey.EMAIL_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
            }
            if (repository.existsByMobileNumber(customerRequest.getMobileNumber())) {
                log.error("Mobile number already exists: {}", customerRequest.getMobileNumber());
                throw new InvoiceException(InvoiceErrorMessageKey.MOBILE_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
            }
            CustomerModel customer = new CustomerModel();
            customer.setCustomerName(customerRequest.getCustomerName());
            customer.setEmail(customerRequest.getEmail());
            customer.setCustomerCompany(customerRequest.getCustomerCompany());
            customer.setMobileNumber(customerRequest.getMobileNumber());
            customer.setAddress(customerRequest.getAddress());
            customer.setState(customerRequest.getState());
            customer.setCity(customerRequest.getCity());
            customer.setPinCode(customerRequest.getPinCode());
            customer.setGstNo(customerRequest.getGstNo());
            customer.setStateCode(customerRequest.getStateCode());
            CustomerModel savedCustomer = repository.save(customer);
            log.info("Customer created successfully with ID: {}", savedCustomer.getCustomerId());

            Map<String, Object> response = new HashMap<>();
            response.put(Constants.CUSTOMER_ID, savedCustomer.getCustomerId());
            response.put(Constants.CUSTOMER_NAME, savedCustomer.getCustomerName());
            response.put(Constants.CUSTOMER_EMAIL, savedCustomer.getEmail());
            response.put(Constants.MOBILE_NUMBER, savedCustomer.getMobileNumber());
            response.put(Constants.CUSTOMER_ADDRESS, savedCustomer.getAddress());
            response.put(Constants.CUSTOMER_STATE, savedCustomer.getState());
            response.put(Constants.CUSTOMER_COMPANY,savedCustomer.getCustomerCompany());
            return new ResponseEntity<>(ResponseBuilder.builder().build().createSuccessResponse((String) Constants.CREATE_SUCCESS), HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Unexpected error occurred while creating customer: {}", e.getMessage(), e);
            throw new InvoiceException(InvoiceErrorMessageKey.ERROR_CREATING_COMPANY, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<?> getCustomer(String customerId) throws InvoiceException {
        log.info("Fetching customer with ID: {}", customerId);
        try {
            Optional<CustomerModel> customer = repository.findById(customerId);
            if (customer.isPresent()) {
                CustomerModel customerData = customer.get();
                customerData.setInvoiceModel(null);
                return ResponseEntity.ok(customerData);
            } else {
                log.error("Customer not found with ID: {}", customerId);
                throw new InvoiceException(InvoiceErrorMessageKey.CUSTOMER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            log.error("Error fetching customer with ID {}: {}", customerId, e.getMessage(), e);
            throw new InvoiceException(InvoiceErrorMessageKey.INTERNAL_SERVER_ERROR.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> getAllCustomers() throws InvoiceException {
        log.info("Fetching all customers");
        try {
            List<CustomerModel> customers = repository.findAll();
            if (customers == null || customers.isEmpty()) {
                log.info("No customers found in the database.");
                return ResponseEntity.ok(Collections.emptyList());
            }
            List<Map<String, Object>> responseList = customers.stream()
                    .map(customerMapper::toResponseMap)
                    .collect(Collectors.toList());
            log.info("All customers fetched successfully, total count: {}", responseList.size());
            return new ResponseEntity<>(ResponseBuilder.builder().build().createSuccessResponse(responseList), HttpStatus.OK);
        } catch (Exception e) {
            log.error("An error occurred while fetching all customers: {}", e.getMessage(), e);
            throw new InvoiceException(InvoiceErrorMessageKey.INTERNAL_SERVER_ERROR.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> updateCustomer(String customerId, @Valid CustomerRequest customerRequest) throws InvoiceException {
        log.info("Updating customer with ID: {}", customerId);
        try {
            Optional<CustomerModel> existingCustomer = repository.findById(customerId);
            if (existingCustomer.isPresent()) {
                CustomerModel customerToUpdate = existingCustomer.get();
                if (!customerToUpdate.getEmail().equals(customerRequest.getEmail())) {
                    if (repository.existsByEmail(customerRequest.getEmail())) {
                        log.error("Email already exists: {}", customerRequest.getEmail());
                        throw new InvoiceException(InvoiceErrorMessageKey.EMAIL_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
                    }
                }
                if (!customerToUpdate.getGstNo().equals(customerRequest.getGstNo())) {
                    if (repository.existsByGstNo(customerRequest.getGstNo())) {
                        log.error("GST Number already exists: {}", customerRequest.getGstNo());
                        throw new InvoiceException(InvoiceErrorMessageKey.GSTNO_ALREADY_EXISTS, HttpStatus.BAD_REQUEST);
                    }
                }
                customerToUpdate.setCustomerName(customerRequest.getCustomerName());
                customerToUpdate.setEmail(customerRequest.getEmail());
                customerToUpdate.setCustomerCompany(customerRequest.getCustomerCompany());
                customerToUpdate.setMobileNumber(customerRequest.getMobileNumber());
                customerToUpdate.setAddress(customerRequest.getAddress());
                customerToUpdate.setState(customerRequest.getState());
                customerToUpdate.setCity(customerRequest.getCity());
                customerToUpdate.setPinCode(customerRequest.getPinCode());
                customerToUpdate.setGstNo(customerRequest.getGstNo());
                customerToUpdate.setStateCode(customerRequest.getStateCode());
                repository.save(customerToUpdate);
                return new ResponseEntity<>(ResponseBuilder.builder().build().createSuccessResponse(Constants.UPDATE_SUCCESS), HttpStatus.OK);
            } else {
                log.error("Customer not found with ID: {}", customerId);
                throw new InvoiceException(InvoiceErrorMessageKey.CUSTOMER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            log.error("Error updating customer with ID {}: {}", customerId, e.getMessage(), e);
            throw new InvoiceException(InvoiceErrorMessageKey.INTERNAL_SERVER_ERROR.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> deleteCustomer(String customerId) throws InvoiceException {
        log.info("Deleting customer with ID: {}", customerId);
        try {
            if (!repository.existsById(customerId)) {
                log.error("Customer not found with ID: {}", customerId);
                throw new InvoiceException(InvoiceErrorMessageKey.CUSTOMER_NOT_FOUND, HttpStatus.NOT_FOUND);
            }
            repository.deleteById(customerId);
            return new ResponseEntity<>(ResponseBuilder.builder().build().createSuccessResponse(Constants.DELETE_SUCCESS), HttpStatus.OK);
        }  catch (Exception e) {
            log.error("Error deleting customer with ID {}: {}", customerId, e.getMessage(), e);
            throw new InvoiceException(InvoiceErrorMessageKey.INTERNAL_SERVER_ERROR.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

