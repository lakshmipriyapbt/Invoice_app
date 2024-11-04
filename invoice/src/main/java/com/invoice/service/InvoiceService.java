package com.invoice.service;

import com.invoice.exception.InvoiceException;
import com.invoice.model.InvoiceModel;
import com.invoice.request.InvoiceRequest;
import org.springframework.http.ResponseEntity;

public interface InvoiceService {

    ResponseEntity<?> createInvoice(InvoiceModel invoiceModel) throws InvoiceException;

    ResponseEntity<?> getInvoice(String invoiceId) throws InvoiceException;

    ResponseEntity<?> getAllInvoices() throws InvoiceException;

    ResponseEntity<?> updateInvoice(String invoiceId, InvoiceModel invoiceModel) throws InvoiceException;

    ResponseEntity<?> deleteInvoice(String invoiceId) throws InvoiceException;
}
