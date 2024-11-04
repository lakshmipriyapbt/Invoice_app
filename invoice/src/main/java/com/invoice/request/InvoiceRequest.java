package com.invoice.request;

import lombok.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceRequest {

    @NotNull(message = "Customer name is required")
    private String customerName;

    @NotNull(message = "Purchase order is required")
    private String purchaseOrder;

    @NotNull(message = "Vendor code is required")
    private String vendorCode;

    @NotNull(message = "Invoice date is required")
    private LocalDate invoiceDate;

    @NotNull(message = "Invoice number is required")
    @Size(max = 50, message = "Invoice number cannot exceed 50 characters")
    private String invoiceNumber;

    @NotNull(message = "Product details are required")
    @Size(min = 1, message = "At least one product detail is required")
    private List<OrderRequest> products;

    private String status;
}
