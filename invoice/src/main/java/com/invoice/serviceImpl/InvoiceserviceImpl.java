package com.thinkconstructive.invoice_application.serviceImpl;

import com.thinkconstructive.invoice_application.model.InvoiceModel;
import com.thinkconstructive.invoice_application.repository.InvoiceRepository;
import com.thinkconstructive.invoice_application.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvoiceserviceImpl implements InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    public InvoiceserviceImpl(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    @Override
    public String createInvoice(InvoiceModel invoiceModel) {
        invoiceRepository.save(invoiceModel);
        return "Success";
    }

    @Override
    public InvoiceModel updateInvoice(String invoiceId, InvoiceModel invoiceModel) {

        // First, check if the customer exists
        if(invoiceRepository.existsById(invoiceId)){
            // Fetch the existing customer from the database
            InvoiceModel existingInvoice = invoiceRepository.findById(invoiceId).get();

            // Update the invoice fields
            existingInvoice.setCustomer(invoiceModel.getCustomer());
            existingInvoice.setPurchaseOrder(invoiceModel.getPurchaseOrder());
            existingInvoice.setVendorCode(invoiceModel.getVendorCode());
            existingInvoice.setInvoiceDate(invoiceModel.getInvoiceDate());
            existingInvoice.setInvoiceNumber(invoiceModel.getInvoiceNumber());
            existingInvoice.setProducts(invoiceModel.getProducts());
            existingInvoice.setTotalAmount(invoiceModel.getTotalAmount());
            existingInvoice.setStatus(invoiceModel.getStatus());

            // Save the updated invoice
            return invoiceRepository.save(existingInvoice);
        } else {
            throw new RuntimeException("Invoice not found with id: " + invoiceId);
        }
    }

    @Override
    public InvoiceModel getInvoiceById(String invoiceId) {
        return invoiceRepository.findById(invoiceId).get();
    }

    @Override
    public String deleteInvoice(String invoiceId) {
        if (invoiceRepository.existsById(invoiceId)) {
            // Delete the invoice
            invoiceRepository.deleteById(invoiceId);
            return "Record Deleted Successfully";
        } else {
            throw new RuntimeException("Invoice not found with id: " + invoiceId);
        }
    }

    @Override
    public List<InvoiceModel> getAllInvoices() {
        return invoiceRepository.findAll();
    }
}
