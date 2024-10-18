package com.invoice.controller;

import com.invoice.model.InvoiceModel;
import com.invoice.service.InvoiceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/invoice")
public class InvoiceController {

    InvoiceService invoiceService;

    public InvoiceController(InvoiceService invoiceService) {
        this.invoiceService = invoiceService;
    }
    @PostMapping("/create")
    public String createInvoice(@RequestBody InvoiceModel invoiceModel) {
         invoiceService.createInvoice(invoiceModel);
        return "Invoice Created Successfully";
    }

    @PutMapping("/update/{invoiceId}")
    public String updateInvoice(@PathVariable String invoiceId,@RequestBody InvoiceModel invoiceModel){
        return updateInvoice(invoiceId,invoiceModel);
    }

    @DeleteMapping("{invoiceId}")
    public String deleteInvoice(@PathVariable String invoiceId){
        return invoiceService.deleteInvoice(invoiceId);
    }

    @GetMapping("{invoiceId}")
    public InvoiceModel getInvoice(@PathVariable String invoiceId){
        return invoiceService.getInvoiceById(invoiceId);
    }

    @GetMapping("/all")
    public List<InvoiceModel> getAllInvoice(){
        return invoiceService.getAllInvoices();
    }



}
