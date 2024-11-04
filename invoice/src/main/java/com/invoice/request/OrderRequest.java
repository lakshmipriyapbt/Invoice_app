package com.invoice.request;

import lombok.*;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {

    @NotNull(message = "Product ID is required")
    private String productId;

    @NotNull(message = "HSN number is required")
    private String hsnNo;

    @NotNull(message = "Purchase date is required")
    private LocalDate purchaseDate;

    @NotNull(message = "Quantity is required")
    private Integer quantity;

    @NotNull(message = "Cost is required")
    private BigDecimal cost;
}
