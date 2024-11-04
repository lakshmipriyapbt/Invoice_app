package com.invoice.serviceImpl;

import com.invoice.exception.InvoiceErrorMessageKey;
import com.invoice.exception.InvoiceException;
import com.invoice.model.InvoiceModel;
import com.invoice.repository.InvoiceRepository;
import com.invoice.service.InvoiceService;
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
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository repository;  // Invoice repository

    @Autowired
    public InvoiceServiceImpl(InvoiceRepository repository) {
        this.repository = repository;
    }

    @Override
    public ResponseEntity<?> createInvoice(@Valid InvoiceModel invoiceModel) {
        log.debug("Creating invoice: {}", invoiceModel);
        InvoiceModel invoice = InvoiceModel.builder()
                .customer(invoiceModel.getCustomer())
                .purchaseOrder(invoiceModel.getPurchaseOrder())
                .vendorCode(invoiceModel.getVendorCode())
                .invoiceDate(invoiceModel.getInvoiceDate())
                .invoiceNumber(invoiceModel.getInvoiceNumber())
                .orders(invoiceModel.getOrders())
                .totalAmount(invoiceModel.getTotalAmount())
                .status("Pending")  // Default status
                .build();

        repository.save(invoice);
        return new ResponseEntity<>(
                ResponseBuilder.builder().build().createSuccessResponse("Invoice created successfully!"),
                HttpStatus.CREATED
        );
    }

    @Override
    public ResponseEntity<?> getInvoice(String invoiceId) throws InvoiceException {
        log.info("Fetching invoice with ID: {}", invoiceId);
        Optional<InvoiceModel> invoice = repository.findById((invoiceId));
        return invoice.map(value -> new ResponseEntity<>(
                        ResponseBuilder.builder().build().createSuccessResponse(value),
                        HttpStatus.OK))
                .orElseThrow(() -> new InvoiceException(InvoiceErrorMessageKey.INVOICE_NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    @Override
    @Transactional
    public ResponseEntity<?> getAllInvoices() {
        log.info("Fetching all invoices");
        List<InvoiceModel> invoices = repository.findAll();
        return new ResponseEntity<>(
                ResponseBuilder.builder().build().createSuccessResponse(invoices),
                HttpStatus.OK
        );
    }

    @Override
    @Transactional
    public ResponseEntity<?> deleteInvoice(String invoiceId) throws InvoiceException {
        log.info("Deleting invoice with ID: {}", invoiceId);
        if (repository.existsById(invoiceId)) {
            repository.deleteById(invoiceId);
            return new ResponseEntity<>(
                    ResponseBuilder.builder().build().createSuccessResponse("Deleted record successfully"),
                    HttpStatus.OK
            );
        } else {
            throw new InvoiceException(InvoiceErrorMessageKey.INVOICE_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> updateInvoice(String invoiceId, @Valid InvoiceModel invoiceModel) throws InvoiceException {
        log.info("Updating invoice with ID: {}", invoiceId);
        return repository.findById((invoiceId))
                .map(existingInvoice -> {
                    existingInvoice.setCustomer(invoiceModel.getCustomer());
                    existingInvoice.setPurchaseOrder(invoiceModel.getPurchaseOrder());
                    existingInvoice.setVendorCode(invoiceModel.getVendorCode());
                    existingInvoice.setInvoiceDate(invoiceModel.getInvoiceDate());
                    existingInvoice.setInvoiceNumber(invoiceModel.getInvoiceNumber());
                    existingInvoice.setOrders(invoiceModel.getOrders());
                    existingInvoice.setTotalAmount(invoiceModel.getTotalAmount());
                    existingInvoice.setStatus(invoiceModel.getStatus());
                    repository.save(existingInvoice);
                    return new ResponseEntity<>(
                            ResponseBuilder.builder().build().createSuccessResponse("Invoice updated successfully!"),
                            HttpStatus.OK
                    );
                }).orElseThrow(() -> new InvoiceException(InvoiceErrorMessageKey.INVOICE_NOT_FOUND, HttpStatus.NOT_FOUND));
    }
}
