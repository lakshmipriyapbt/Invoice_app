package com.thinkconstructive.invoice_application.serviceImpl;

import com.thinkconstructive.invoice_application.model.customerModel;
import com.thinkconstructive.invoice_application.repository.customerRepository;
import com.thinkconstructive.invoice_application.service.customerService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class customerServiceImpl implements customerService {

    customerRepository customerRepository;


    @Autowired
    public customerServiceImpl(customerRepository invoiceRepository) {
        this.customerRepository = invoiceRepository;
    }



    @Override
    public String createCustomer(customerModel invoiceModel) {
        customerRepository.save(invoiceModel);
        return "Success";
    }

    @Override
    @Transactional
    public String updateCustomer(String customerId, customerModel customerModel) {
        // First, check if the customer exists
        if(customerRepository.existsById(customerId)){
            // Fetch the existing customer from the database
            customerModel existingCustomer = customerRepository.findById(customerId).get();

            // Update the details
            existingCustomer.setCustomerName(customerModel.getCustomerName());
            existingCustomer.setEmail(customerModel.getEmail());
            existingCustomer.setMobileNumber(customerModel.getMobileNumber());
            existingCustomer.setAddress(customerModel.getAddress());
            existingCustomer.setState(customerModel.getState());
            existingCustomer.setCity(customerModel.getCity());
            existingCustomer.setPinCode(customerModel.getPinCode());
            existingCustomer.setGstno(customerModel.getGstno());
            existingCustomer.setStateCode(customerModel.getStateCode());

            // Save the updated record
            customerRepository.save(existingCustomer);
            return "Customer updated successfully!";
        }
        else {
            return "Customer not found";

        }


    }

    @Override
    @Transactional
    public String deleteCustomer(String customerId) {
        customerRepository.deleteById(customerId);
        return "Delete Record Successfully";
    }

    @Override
    @Transactional
    public customerModel getCustomer(String customerId) {
        return customerRepository.findById(customerId).get();
    }

    @Override
    @Transactional
    public List<customerModel> getAllCustomers() {
        return customerRepository.findAll();
    }
}
