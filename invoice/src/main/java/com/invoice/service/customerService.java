package com.invoice.service;

import com.invoice.model.customerModel;
import jakarta.transaction.Transactional;

import java.util.List;

public interface customerService {


    String createCustomer(customerModel invoiceModel);

   // String updateCustomer(InvoiceModel invoiceModel);

    @Transactional
    String updateCustomer(String customerId, customerModel customer);

    String deleteCustomer(String customerId);

    customerModel getCustomer(String customerId);

    List<customerModel> getAllCustomers();
}
