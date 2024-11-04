package com.invoice.util;
import org.springframework.stereotype.Component;

@Component
public class Constants {
    // Error Messages
    public static final String REMOTE_SERVICE_UNAVAILABLE = "Remote service is not available at the moment";
    public static final String REQUEST_PAYLOAD_INVALID = "Request payload is not valid";
    public static final String REQUEST_UNAUTHORIZED = "Request is unauthorized";
    public static final String REQUEST_RESOURCE_DUPLICATE = "Resource already exists";
    public static final String REQUEST_RESOURCE_NOT_FOUND = "Resource not found";
    public static final String REQUEST_OPERATION_INVALID = "This operation is not allowed";
    public static final String REQUEST_UNABLE_TO_PROCESS = "Remote service is not able to process the request at the moment";
    // General Constants
    public static final String RESOURCE_ID = "ResourceId";
    public static final String INVOICE_PREFIX = "INV-";
    public static final String INVOICE_DATE_FORMAT = "yyyy-MM-dd";
    public static final String DEFAULT_CURRENCY = "INR";
    // Invoice Related Constants
    public static final String INVOICE_STATUS_PENDING = "Pending";
    public static final String INVOICE_STATUS_PAID = "Paid";
    public static final String INVOICE_STATUS_CANCELLED = "Cancelled";
    // Payment Related Constants
    public static final String PAYMENT_STATUS_COMPLETED = "Completed";
    public static final String PAYMENT_STATUS_FAILED = "Failed";
    public static final String PAYMENT_METHOD_CREDIT_CARD = "Credit Card";
    public static final String PAYMENT_METHOD_DEBIT_CARD = "Debit Card";
    public static final String PAYMENT_METHOD_PAYPAL = "PayPal";


}

