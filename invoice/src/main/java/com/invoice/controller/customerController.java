package com.invoice.controller;

import com.invoice.model.customerModel;
import com.invoice.service.customerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class customerController {


    customerService service;

    public customerController(customerService invoiceService) {
        this.service = invoiceService;
    }
    @GetMapping("/{customerId}")
    public customerModel getCustomerDetails(@PathVariable String customerId){
        return service.getCustomer(customerId);
    }
    @GetMapping("/all")
    public List<customerModel> getAllCustomerDetails(){

        return service.getAllCustomers();
    }
    @PostMapping("/register ")
    public String createCustomer(@RequestBody customerModel invoiceModel){
        service.createCustomer(invoiceModel);
        return "Customer created Successfully";
    }
    @PutMapping("/update/{customerId}")
    public String updateCustomer(@PathVariable("customerId") String customerId, @RequestBody customerModel invoiceModel){

        return service.updateCustomer(customerId,invoiceModel);
    }
    @DeleteMapping("/{customerId}")
    public String deleteCustomer(@PathVariable String customerId){
        return service.deleteCustomer(customerId);
    }

}
