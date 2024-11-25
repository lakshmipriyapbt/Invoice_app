package com.invoicelogin.exceptions;

public enum InvoiceErrorMessageKey {
    INVALID_TOKEN("invalid.token"),
    USER_NOT_FOUND("user.not.found"),
    INVALID_USERNAME("invalid.username"),
    COMPANY_NOT_FOUND("company.not.found"),
    INVALID_EMAIL_PASSWORD("invalid.email.password"),
    PASSWORD_NOT_MATCH("password.not.match"),
    INVALID_EMAIL("invalid.email"),
    FAILED_TO_SEND_OTP("failed.to.send.otp"),
    COMPANY_ID_NOT_FOUND("company.id.not.fount"),
    USERID_NOT_FOUND("userId.not.found");

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

