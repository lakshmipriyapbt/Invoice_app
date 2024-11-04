package com.invoice.exception;

public enum InvoiceErrorMessageKey {

    PRODUCT_NOT_FOUND("product.not.found"),
    CUSTOMER_NOT_FOUND("customer.not.found"),
    INVOICE_NOT_FOUND("invoice.not.found"),
    ORDERS_NOT_FOUND("order.not.found"),
    ORDER_NOT_FOUND("order.not.found");

    private final String message;

    InvoiceErrorMessageKey(String message) {
        this.message = message;
    }
    public String getMessage() {
        return message;
    }
    @Override
    public String toString() {
        return message;
    }
}
