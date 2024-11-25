package com.invoice.serviceImpl;

import com.invoice.config.GstConfig;
import com.invoice.exception.InvoiceErrorMessageKey;
import com.invoice.exception.InvoiceException;
import com.invoice.model.*;
import com.invoice.repository.*;
import com.invoice.request.InvoiceRequest;
import com.invoice.request.OrderRequest;
import com.invoice.response.InvoiceResponse;
import com.invoice.service.InvoiceService;
import com.invoice.common.ResponseBuilder;
import com.invoice.util.Constants;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository repository;

    @Autowired
    public InvoiceServiceImpl(InvoiceRepository repository) {
        this.repository = repository;
    }

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private GstConfig gstConfig;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    @Transactional
    public ResponseEntity<?> saveInvoice(@Valid InvoiceRequest request) throws InvoiceException {
        log.debug("Creating invoice: {}", request);
        try {
            Optional<CustomerModel> customer = customerRepository.findByCustomerName(request.getCustomerName());
            if (!customer.isPresent()) {
                log.error("Customer not found for name: {}", request.getCustomerName());
                throw new InvoiceException(InvoiceErrorMessageKey.CUSTOMER_NOT_FOUND.getMessage(), HttpStatus.BAD_REQUEST);
            }
            Optional<CompanyModel> company;
            try {
                company = companyRepository.findAll().stream().findFirst();
                if (!company.isPresent()) {
                    log.error("No company record found in the database.");
                    throw new InvoiceException(InvoiceErrorMessageKey.COMPANY_NOT_FOUND.getMessage(), HttpStatus.BAD_REQUEST);
                }
            } catch (Exception e) {
                log.error("Error retrieving company: {}", e.getMessage(), e);
                throw new InvoiceException(InvoiceErrorMessageKey.COMPANY_RETRIEVAL_FAILED.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
            InvoiceModel invoice = new InvoiceModel();
            try {
                invoice.setCustomer(customer.get());
                invoice.setCompanyModel(company.get());
                invoice.setPurchaseOrder(request.getPurchaseOrder());
                invoice.setVendorCode(request.getVendorCode());
                invoice.setInvoiceDate(request.getInvoiceDate());
                invoice.setStatus(request.getStatus());
            } catch (Exception e) {
                log.error("Error setting invoice fields: {}", e.getMessage(), e);
                throw new InvoiceException(InvoiceErrorMessageKey.INVOICE_CREATION_FAILED.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
            List<OrderModel> orderModels = new ArrayList<>();
            BigDecimal totalAmount = BigDecimal.ZERO;
            try {
                for (OrderRequest orderRequest : request.getOrderRequests()) {
                    try {
                        OrderModel orderModel = new OrderModel();
                        orderModel.setPurchaseDate(LocalDate.parse(orderRequest.getPurchaseDate()));
                        orderModel.setQuantity(String.valueOf(orderRequest.getQuantity()));

                        ProductModel product = productRepository.findById(orderRequest.getProductId())
                                .orElseThrow(() -> new InvoiceException(InvoiceErrorMessageKey.PRODUCT_NOT_FOUND.getMessage(), HttpStatus.NOT_FOUND));

                        orderModel.setCost(String.valueOf(product.getUnitCost()));

                        BigDecimal quantity = new BigDecimal(orderRequest.getQuantity());
                        BigDecimal cost = new BigDecimal(orderModel.getCost());
                        BigDecimal totalCost = quantity.multiply(cost);
                        orderModel.setTotalCost(totalCost);
                        totalAmount = totalAmount.add(totalCost);
                        orderModels.add(orderModel);
                        orderModel.setProduct(product);
                        orderModel.setInvoiceModel(invoice);

                    }  catch (Exception e) {
                        log.error("Error processing order for productId {}: {}", orderRequest.getProductId(), e.getMessage(), e);
                        throw new InvoiceException(InvoiceErrorMessageKey.ORDER_CREATION_FAILED.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
                    }
                }
                invoice.setOrderModels(orderModels);
                invoice.setTotalAmount(totalAmount);
            } catch (Exception e) {
                log.error("Unexpected error while processing orders: {}", e.getMessage(), e);
                throw new InvoiceException(InvoiceErrorMessageKey.ORDER_PROCESSING_FAILED.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
            try {
                // GST Calculation Logic
                String companyGstNo = company.get().getGstNumber();
                String customerGstNo = customer.get().getGstNo();
                // If either customer or company GST number is missing, set all GST-related values to 0
                if (companyGstNo == null || customerGstNo == null) {
                    invoice.setGst(Constants.ZERO);
                    invoice.setCGst(Constants.ZERO);
                    invoice.setSGst(Constants.ZERO);
                    invoice.setIGst(Constants.ZERO);
                    invoice.setGrandTotal(totalAmount.toString());
                } else {
                    String companyStateCode = extractStateCode(companyGstNo);
                    String customerStateCode = extractStateCode(customerGstNo);
                    BigDecimal gstRate = gstConfig.getRate();

                    if (companyStateCode.equals(customerStateCode)) {
                        BigDecimal halfGst = totalAmount.multiply(gstRate).divide((gstConfig.getValue()));
                        invoice.setGst(gstRate.toString());
                        invoice.setCGst(halfGst.toString());
                        invoice.setSGst(halfGst.toString());
                        invoice.setIGst(Constants.ZERO);
                        invoice.setGst(Constants.ZERO);
                        BigDecimal grandTotal = totalAmount.add(halfGst.multiply(gstConfig.getValue())); // Add both CGST and SGST
                        invoice.setGrandTotal(grandTotal.toString());
                    } else {
                        BigDecimal igst = totalAmount.multiply(gstRate);
                        invoice.setGst(Constants.ZERO);
                        invoice.setCGst(Constants.ZERO);
                        invoice.setSGst(Constants.ZERO);
                        invoice.setIGst(igst.toString());
                        BigDecimal grandTotal = totalAmount.add(igst);
                        invoice.setGrandTotal(grandTotal.toString());
                    }
                }
                repository.save(invoice);
            } catch (Exception e) {
                log.error("Error saving invoice to the database: {}", e.getMessage(), e);
                throw new InvoiceException(InvoiceErrorMessageKey.INVOICE_SAVE_FAILED.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
            log.info("Invoice created successfully for customer: {}", request.getCustomerName());
            return new ResponseEntity<>(ResponseBuilder.builder().build().createSuccessResponse(Constants.CREATE_SUCCESS), HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Unexpected error during invoice creation: {}", e.getMessage(), e);
            throw new  InvoiceException(InvoiceErrorMessageKey.UNEXPECTED_ERROR.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private String extractStateCode(String gstNumber) {
        if (gstNumber == null || gstNumber.length() < 2) {
            return null;
        }
        return gstNumber.substring(0, 2);
    }

    @Override
    public ResponseEntity<?> getInvoice(String invoiceId) throws InvoiceException {
        log.info("Fetching invoice with ID: {}", invoiceId);
        try {
            Optional<InvoiceModel> optionalInvoice = repository.findById(invoiceId);
            if (optionalInvoice.isEmpty()) {
                log.error("Invoice not found with ID: {}", invoiceId);
                throw new InvoiceException(InvoiceErrorMessageKey.INVOICE_NOT_FOUND.getMessage(), HttpStatus.NOT_FOUND);
            }
            InvoiceModel invoice = optionalInvoice.get();
            Map<String, Object> response = new HashMap<>();
            response.put(Constants.CUSTOMER_NAME, invoice.getCustomer().getCustomerName());
            response.put(Constants.EMAIL,invoice.getCustomer().getEmail());
            response.put(Constants.CUSTOMER_ADDRESS,invoice.getCustomer().getAddress());
            response.put(Constants.CITY,invoice.getCustomer().getCity());
            response.put(Constants.GST_NO,invoice.getCustomer().getGstNo());
            response.put(Constants.CUSTOMER_MOBILE,invoice.getCustomer().getCustomerId());
            response.put(Constants.PINCODE,invoice.getCustomer().getPinCode());
            response.put(Constants.CUSTOMER_STATE,invoice.getCustomer().getState());
            response.put(Constants.CUSTOMER_STATE_CODE,invoice.getCustomer().getStateCode());
            response.put(Constants.CUSTOMER_ID, invoice.getCustomer().getCustomerId());
            response.put(Constants.INVOICE_ID, invoice.getInvoiceId());
            response.put(Constants.PURCHASE_ORDER, invoice.getPurchaseOrder());
            response.put(Constants.VENDOR_CODE, invoice.getVendorCode());
            response.put(Constants.INVOICE_DATE, invoice.getInvoiceDate());
            response.put(Constants.TOTAL_AMOUNT, invoice.getTotalAmount());
            response.put(Constants.GRAND_TOTAL,invoice.getGrandTotal());
            response.put(Constants.GST,invoice.getGst());
            response.put(Constants.C_GST,invoice.getCGst());
            response.put(Constants.S_GST,invoice.getSGst());
            response.put(Constants.I_GST,invoice.getIGst());
            List<Map<String, Object>> orderRequests = invoice.getOrderModels().stream()
                    .map(order -> {
                        Map<String, Object> orderMap = new HashMap<>();
                        orderMap.put(Constants.PRODUCT_ID, order.getProduct().getProductId());
                        orderMap.put(Constants.PRODUCT_NAME, order.getProduct().getProductName());
                        //orderMap.put(Constants.GST, order.getProduct().getGst());
                        orderMap.put(Constants.TOTAL_COST, order.getProduct().getUnitCost());
                       // orderMap.put(Constants.COST, order.getProduct().getProductCost());
                        orderMap.put(Constants.HSN_NO, order.getProduct().getHsnNo());
                        orderMap.put(Constants.PURCHASE_DATE, order.getPurchaseDate());
                        orderMap.put(Constants.QUANTITY, order.getQuantity());
                        return orderMap;
                    })
                    .collect(Collectors.toList());
            response.put(Constants.ORDER_REQUESTS, orderRequests);
            response.put(Constants.STATUS_VALUE, Constants.STATUS);
            log.info("Invoice with ID: {} fetched successfully", invoiceId);
            return new ResponseEntity<>(ResponseBuilder.builder().build().createSuccessResponse(response), HttpStatus.OK);
        } catch (Exception e) {
            log.error("An error occurred while fetching invoice: {}", e.getMessage(), e);
            throw new InvoiceException(InvoiceErrorMessageKey.INVALID_INVOICE_ID_FORMAT.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> getAllInvoices() throws InvoiceException {
        log.info("Fetching all invoices");
        try {
            List<InvoiceModel> invoices = repository.findAll();
            if (invoices == null || invoices.isEmpty()) {
                log.info("No users found in the database.");
                return ResponseEntity.ok(Collections.emptyList());
            }
            List<Map<String, Object>> responseList = invoices.stream()
                    .map(invoice -> {
                        Map<String, Object> response = new HashMap<>();
                        response.put(Constants.CUSTOMER_NAME, invoice.getCustomer().getCustomerName());
                        response.put(Constants.EMAIL,invoice.getCustomer().getEmail());
                        response.put(Constants.CUSTOMER_ADDRESS,invoice.getCustomer().getAddress());
                        response.put(Constants.CITY,invoice.getCustomer().getCity());
                        response.put(Constants.GST_NO,invoice.getCustomer().getGstNo());
                        response.put(Constants.CUSTOMER_MOBILE,invoice.getCustomer().getCustomerId());
                        response.put(Constants.PINCODE,invoice.getCustomer().getPinCode());
                        response.put(Constants.CUSTOMER_STATE,invoice.getCustomer().getState());
                        response.put(Constants.CUSTOMER_STATE_CODE,invoice.getCustomer().getStateCode());
                        response.put(Constants.CUSTOMER_ID, invoice.getCustomer().getCustomerId());
                        response.put(Constants.INVOICE_ID, invoice.getInvoiceId());
                        response.put(Constants.PURCHASE_ORDER, invoice.getPurchaseOrder());
                        response.put(Constants.VENDOR_CODE, invoice.getVendorCode());
                        response.put(Constants.INVOICE_DATE, invoice.getInvoiceDate());
                        response.put(Constants.TOTAL_AMOUNT, invoice.getTotalAmount());
                        response.put(Constants.GRAND_TOTAL,invoice.getGrandTotal());
                        response.put(Constants.GST,invoice.getGst());
                        response.put(Constants.C_GST,invoice.getCGst());
                        response.put(Constants.S_GST,invoice.getSGst());
                        response.put(Constants.I_GST,invoice.getIGst());
                        List<Map<String, Object>> orderRequests = invoice.getOrderModels().stream()
                                .map(order -> {
                                    Map<String, Object> orderMap = new HashMap<>();
                                    orderMap.put(Constants.PRODUCT_ID, order.getProduct().getProductId());
                                    orderMap.put(Constants.PRODUCT_NAME, order.getProduct().getProductName());
                                  //  orderMap.put(Constants.GST, order.getProduct().getGst());
                                    orderMap.put(Constants.TOTAL_COST, order.getProduct().getUnitCost());
                                   // orderMap.put(Constants.COST, order.getProduct().getProductCost());
                                    orderMap.put(Constants.HSN_NO, order.getProduct().getHsnNo());
                                    orderMap.put(Constants.PURCHASE_DATE, order.getPurchaseDate());
                                    orderMap.put(Constants.QUANTITY, order.getQuantity());
                                    return orderMap;
                                })
                                .collect(Collectors.toList());

                        response.put(Constants.ORDER_REQUESTS, orderRequests);
                        response.put(Constants.STATUS, invoice.getStatus() != null ? invoice.getStatus() : Constants.STATUS_VALUE);
                        return response;
                    })
                    .collect(Collectors.toList());
            log.info("All invoices fetched successfully, total count: {}", responseList.size());
            return new ResponseEntity<>(ResponseBuilder.builder().build().createSuccessResponse(responseList), HttpStatus.OK);
        } catch (Exception e) {
            log.error("An error occurred while fetching all invoices: {}", e.getMessage(), e);
            throw new InvoiceException(InvoiceErrorMessageKey.INTERNAL_SERVER_ERROR.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> deleteInvoice(String invoiceId) throws InvoiceException {
        log.info("Attempting to delete invoice with ID: {}", invoiceId);
        try {
            if (repository.existsById(invoiceId)) {
                try {
                    repository.deleteById(invoiceId);
                    log.info("Invoice with ID: {} successfully deleted.", invoiceId);
                    return new ResponseEntity<>(ResponseBuilder.builder().build().createSuccessResponse(Constants.DELETE_SUCCESS), HttpStatus.OK);
                } catch (Exception e) {
                    log.error("Error occurred while deleting invoice with ID: {}: {}", invoiceId, e.getMessage(), e);
                    throw new InvoiceException(InvoiceErrorMessageKey.INVOICE_DELETION_FAILED.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
                }
            } else {
                log.error("Invoice with ID: {} not found in the database.", invoiceId);
                throw new InvoiceException(InvoiceErrorMessageKey.INVOICE_NOT_FOUND.getMessage(), HttpStatus.NOT_FOUND);
            }
        } catch (InvoiceException e) {
            log.error("Unexpected error occurred while attempting to delete invoice with ID: {}: {}", invoiceId, e.getMessage(), e);
            throw new InvoiceException(InvoiceErrorMessageKey.UNEXPECTED_ERROR.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> updateInvoice(String invoiceId, @Valid InvoiceRequest request) throws InvoiceException {
        log.debug("Updating invoice with ID: {}", invoiceId);
        InvoiceModel existingInvoice = repository.findById(invoiceId).orElseThrow(() -> new InvoiceException(InvoiceErrorMessageKey.INVOICE_NOT_FOUND, HttpStatus.NOT_FOUND));
        try {
            existingInvoice.setPurchaseOrder(request.getPurchaseOrder());
            existingInvoice.setVendorCode(request.getVendorCode());
            existingInvoice.setInvoiceDate(request.getInvoiceDate());
            existingInvoice.setStatus(request.getStatus());
            List<OrderModel> updatedOrderModels = new ArrayList<>();
            BigDecimal totalAmount = BigDecimal.ZERO;
            for (OrderRequest orderRequest : request.getOrderRequests()) {
                try {
                    ProductModel product = productRepository.findById(orderRequest.getProductId())
                            .orElseThrow(() -> new InvoiceException(InvoiceErrorMessageKey.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND));
                    Optional<OrderModel> existingOrder = existingInvoice.getOrderModels().stream()
                            .filter(order -> order.getProduct().getProductId().equals(orderRequest.getProductId()))
                            .findFirst();

                    OrderModel orderModel;
                    if (existingOrder.isPresent()) {
                        orderModel = existingOrder.get();
                    } else {
                        orderModel = new OrderModel();
                        orderModel.setInvoiceModel(existingInvoice);
                        orderModel.setProduct(product);
                    }
                    orderModel.setPurchaseDate(LocalDate.parse(orderRequest.getPurchaseDate()));
                    orderModel.setQuantity(String.valueOf(orderRequest.getQuantity()));
                    orderModel.setCost(String.valueOf(product.getUnitCost()));
                    BigDecimal quantity = new BigDecimal(orderRequest.getQuantity());
                    BigDecimal cost = new BigDecimal(orderModel.getCost());
                    BigDecimal totalCost = quantity.multiply(cost);
                    orderModel.setTotalCost(totalCost);
                    updatedOrderModels.add(orderModel);
                    totalAmount = totalAmount.add(totalCost);
                }  catch (Exception e) {
                    log.error("Error updating order for productId {}: {}", orderRequest.getProductId(), e.getMessage());
                    throw new InvoiceException(InvoiceErrorMessageKey.INVOICE_UPDATE_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
            // GST Calculation Logic
            String companyGstNo = existingInvoice.getCompanyModel().getGstNumber();
            String customerGstNo = existingInvoice.getCustomer().getGstNo();

            BigDecimal gstRate = gstConfig.getRate();
            if (companyGstNo == null || customerGstNo == null) {
                existingInvoice.setGst(Constants.ZERO);
                existingInvoice.setCGst(Constants.ZERO);
                existingInvoice.setSGst(Constants.ZERO);
                existingInvoice.setIGst(Constants.ZERO);
                existingInvoice.setGrandTotal(totalAmount.toString());
            } else {
                String companyStateCode = extractStateCode(companyGstNo);
                String customerStateCode = extractStateCode(customerGstNo);
                if (companyStateCode.equals(customerStateCode)) {
                    BigDecimal halfGst = totalAmount.multiply(gstRate).divide(BigDecimal.valueOf(2));
                    existingInvoice.setGst(gstRate.toString());
                    existingInvoice.setCGst(halfGst.toString());
                    existingInvoice.setSGst(halfGst.toString());
                    existingInvoice.setIGst(Constants.ZERO);
                    existingInvoice.setGst(Constants.ZERO);
                    BigDecimal grandTotal = totalAmount.add(halfGst.multiply(BigDecimal.valueOf(2))); // CGST + SGST
                    existingInvoice.setGrandTotal(grandTotal.toString());
                } else {
                    BigDecimal igst = totalAmount.multiply(gstRate);
                    existingInvoice.setGst(Constants.ZERO);
                    existingInvoice.setCGst(Constants.ZERO);
                    existingInvoice.setSGst(Constants.ZERO);
                    existingInvoice.setIGst(igst.toString());
                    BigDecimal grandTotal = totalAmount.add(igst);
                    existingInvoice.setGrandTotal(grandTotal.toString());
                }
            }
            existingInvoice.setTotalAmount(totalAmount);
            existingInvoice.getOrderModels().clear();
            existingInvoice.getOrderModels().addAll(updatedOrderModels);
            repository.save(existingInvoice);
            log.info("Invoice with ID: {} updated successfully", invoiceId);
            return new ResponseEntity<>(ResponseBuilder.builder().build().createSuccessResponse(Constants.UPDATE_SUCCESS), HttpStatus.OK);
        } catch (Exception e) {
            log.error("Unexpected error during invoice update: {}", e.getMessage());
            throw new InvoiceException(InvoiceErrorMessageKey.UNEXPECTED_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> generateInvoice(Long invoiceId) throws InvoiceException {
        log.info("Generating invoice with ID: {}", invoiceId);
        InvoiceModel invoice = repository.findById(String.valueOf(invoiceId))
                .orElseThrow(() -> new InvoiceException(InvoiceErrorMessageKey.INVOICE_NOT_FOUND, HttpStatus.NOT_FOUND));

        try {
            Map<String, Object> response = new HashMap<>();
            response.put(Constants.COMPANY_NAME, invoice.getCompanyModel() != null ? invoice.getCompanyModel().getCompanyName() : null);
            response.put(Constants.BANK_NAME, invoice.getCompanyModel() != null ? invoice.getCompanyModel().getBankName() : null);
            response.put(Constants.ACCOUNT_NO, invoice.getCompanyModel() != null ? invoice.getCompanyModel().getAccountNumber() : null);
            response.put(Constants.IFSC_CODE, invoice.getCompanyModel() != null ? invoice.getCompanyModel().getIfscCode() : null);
            response.put(Constants.PAN_NO, invoice.getCompanyModel() != null ? invoice.getCompanyModel().getPan() : null);
            response.put(Constants.CUSTOMER_NAME, invoice.getCustomer() != null ? invoice.getCustomer().getCustomerName() : null);
            response.put(Constants.CUSTOMER_EMAIL, invoice.getCustomer() != null ? invoice.getCustomer().getEmail() : null);
            response.put(Constants.CONTACT, invoice.getCustomer() != null ? invoice.getCustomer().getMobileNumber() : null);
            response.put(Constants.GST_NO, invoice.getCustomer() != null ? invoice.getCustomer().getGstNo() : null);
            response.put(Constants.ADDRESS, invoice.getCustomer() != null ? invoice.getCustomer().getAddress() : null);
            response.put(Constants.INVOICE_DATE, invoice.getInvoiceDate() != null ? invoice.getInvoiceDate().toString() : null);
            response.put(Constants.DUE_DATE, invoice.getInvoiceDate() != null ? invoice.getInvoiceDate().plusDays(30).toString() : null); // Example for due date
            response.put(Constants.INVOICE_NUMBER, String.valueOf(invoice.getInvoiceId()));
            response.put(Constants.TOTAL_AMOUNT, invoice.getTotalAmount() != null ? invoice.getTotalAmount().toString() : null);
            response.put(Constants.STATUS, invoice.getStatus() != null ? invoice.getStatus().toString() : null);
            response.put(Constants.GRAND_TOTAL,invoice.getGrandTotal() != null ? invoice.getGrandTotal().toString() : null);
            response.put(Constants.GST,invoice.getGst() != null ? invoice .getGst().toString() : null);
            response.put(Constants.C_GST,invoice.getCGst() != null ? invoice .getCGst().toString() : null);
            response.put(Constants.S_GST,invoice.getSGst() != null ? invoice .getSGst().toString() : null);
            response.put(Constants.I_GST,invoice.getIGst() != null ? invoice .getIGst().toString() : null);

            // Process orders and products for the invoice
            if (invoice.getOrderModels() != null && !invoice.getOrderModels().isEmpty()) {
                List<Map<String, Object>> orderRequests = invoice.getOrderModels().stream()
                        .map(order -> {
                            Map<String, Object> orderMap = new HashMap<>();
                            orderMap.put(Constants.PRODUCT_ID, order.getProduct() != null ? order.getProduct().getProductId() : null);
                            orderMap.put(Constants.PRODUCT_NAME, order.getProduct() != null ? order.getProduct().getProductName() : null);
                            //orderMap.put(Constants.GST, order.getProduct() != null ? order.getProduct().getGst() : null);
                            orderMap.put(Constants.TOTAL_COST, order.getProduct() != null ? order.getProduct().getUnitCost() : null);
                            //orderMap.put(Constants.COST, order.getProduct() != null ? order.getProduct().getProductCost() : null);
                            orderMap.put(Constants.HSN_NO, order.getProduct() != null ? order.getProduct().getHsnNo() : null);
                            orderMap.put(Constants.PURCHASE_DATE, order.getPurchaseDate());
                            orderMap.put(Constants.QUANTITY, order.getQuantity());

                            return orderMap;
                        })
                        .collect(Collectors.toList());
                response.put(Constants.ORDER_REQUESTS, orderRequests);
            }
            log.info("Returning success response for invoice ID: {}", invoiceId);
            return new ResponseEntity<>(ResponseBuilder.builder().build().createSuccessResponse(response), HttpStatus.OK);
        } catch (Exception e) {
            log.error("An error occurred while generating the invoice: {}", e.getMessage(), e);
            throw new InvoiceException(InvoiceErrorMessageKey.INTERNAL_SERVER_ERROR.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
