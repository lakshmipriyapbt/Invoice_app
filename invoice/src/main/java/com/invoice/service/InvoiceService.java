package com.invoice.service;


import com.invoice.model.InvoiceModel;

import java.util.List;

public interface InvoiceService {


    String createInvoice(InvoiceModel invoiceModel);
    InvoiceModel updateInvoice(String invoiceId, InvoiceModel invoiceModel);
    InvoiceModel getInvoiceById(String invoiceId);
    String deleteInvoice(String invoiceId);
    List<InvoiceModel> getAllInvoices();
}
