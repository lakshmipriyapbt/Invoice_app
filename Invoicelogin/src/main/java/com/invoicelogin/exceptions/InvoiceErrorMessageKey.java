package com.invoicelogin.exceptions;

public enum InvoiceErrorMessageKey {

    /**
     * All invoice error keys
     */


    INVALID_TOKEN("invalid.token"),
    USER_NOT_FOUND("user.not.found"),
    INVALID_USERNAME("invalid.username"),
    INVALID_OTP("invalid.otp"),
    INVALID_CREDENTIALS("invalid.credentials"),
    INTERNAL_SERVER_ERROR("internal.server.error"),
    OTP_EXPIRED("otp.expired"),
    COMPANY_NOT_FOUND("company.not.found"),
    OTP_NOT_FOUND("otp.not.found"),
    INVALID_Email("invalid.email"),
    INVALID_Email_PASSWORD("invalid.email.password");

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

