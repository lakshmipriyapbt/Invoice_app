package com.invoice.serviceImpl;

import com.invoice.exception.InvoiceErrorMessageKey;
import com.invoice.exception.InvoiceException;
import com.invoice.model.CustomerModel;
import com.invoice.repository.CustomerRepository;
import com.invoice.request.CustomerRequest;
import com.invoice.service.CustomerService;
import com.invoice.common.ResponseBuilder;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository repository;

    @Autowired
    public CustomerServiceImpl(CustomerRepository repository) {
        this.repository = repository;
    }

    @Override
    public ResponseEntity<?> createCustomer(@Valid CustomerRequest customerRequest) {
        log.debug("Creating customer: {}", customerRequest);
        // Convert CustomerRequest to CustomerModel
        CustomerModel customer = new CustomerModel();
        customer.setCustomerName(customerRequest.getCustomerName());
        customer.setEmail(customerRequest.getEmail());
        customer.setMobileNumber(customerRequest.getMobileNumber());
        customer.setAddress(customerRequest.getAddress());
        customer.setState(customerRequest.getState());
        customer.setCity(customerRequest.getCity());
        customer.setPinCode(customerRequest.getPinCode());
        customer.setGstno(customerRequest.getGstNo());
        customer.setStateCode(customerRequest.getStateCode());
        repository.save(customer);
        return new ResponseEntity<>(
                ResponseBuilder.builder().build().createSuccessResponse("Customer created successfully!"),
                HttpStatus.CREATED
        );
    }

    @Override
    public ResponseEntity<?> getCustomer(String customerId) throws InvoiceException {
        log.info("Fetching customer with ID: {}", customerId);
        Optional<CustomerModel> customer = repository.findById((customerId));
        if (customer.isPresent()) {
            return new ResponseEntity<>(
                    ResponseBuilder.builder().build().createSuccessResponse(customer.get()),
                    HttpStatus.OK
            );
        } else {
            throw new InvoiceException(InvoiceErrorMessageKey.CUSTOMER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> getAllCustomers() {
        log.info("Fetching all customers");
        List<CustomerModel> customers = repository.findAll();
        return new ResponseEntity<>(
                ResponseBuilder.builder().build().createSuccessResponse(customers),
                HttpStatus.OK
        );
    }

    @Override
    @Transactional
    public ResponseEntity<?> deleteCustomer(String customerId) throws InvoiceException {
        log.info("Deleting customer with ID: {}", customerId);
        if (repository.existsById((customerId))) {
            repository.deleteById((customerId));
            return new ResponseEntity<>(
                    ResponseBuilder.builder().build().createSuccessResponse("Customer deleted successfully"),
                    HttpStatus.OK
            );
        } else {
            throw new InvoiceException(InvoiceErrorMessageKey.CUSTOMER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> updateCustomer(String customerId, @Valid CustomerRequest customerRequest) throws InvoiceException {
        log.info("Updating customer with ID: {}", customerId);
        Optional<CustomerModel> existingCustomer = repository.findById((customerId));

        if (existingCustomer.isPresent()) {
            CustomerModel customerToUpdate = existingCustomer.get();
            // Update the fields
            customerToUpdate.setCustomerName(customerRequest.getCustomerName());
            customerToUpdate.setEmail(customerRequest.getEmail());
            customerToUpdate.setMobileNumber(customerRequest.getMobileNumber());
            customerToUpdate.setAddress(customerRequest.getAddress());
            customerToUpdate.setState(customerRequest.getState());
            customerToUpdate.setCity(customerRequest.getCity());
            customerToUpdate.setPinCode(customerRequest.getPinCode());
            customerToUpdate.setGstno(customerRequest.getGstNo());
            customerToUpdate.setStateCode(customerRequest.getStateCode());
            repository.save(customerToUpdate);
            return new ResponseEntity<>(
                    ResponseBuilder.builder().build().createSuccessResponse("Customer updated successfully!"),
                    HttpStatus.OK
            );
        } else {
            throw new InvoiceException(InvoiceErrorMessageKey.CUSTOMER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }
}
