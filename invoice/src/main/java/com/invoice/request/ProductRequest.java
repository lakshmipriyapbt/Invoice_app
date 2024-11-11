package com.invoice.request;

import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {

    @NotBlank(message = "{productName.notnull.message}")
    @Size(min = 2, max = 100, message = "{productName.size.message}")
    private String productName;

    @NotNull(message = "{productCost.notnull.message}")
    @Positive(message = "{productCost.type}")
    private String productCost;

    @NotBlank(message = "{hsnNo.notnull.message}")
    @Pattern(regexp = "^\\d{4}$", message = "{hsnNo.format}")
    private String hsnNo;

    @NotNull(message = "{cgstNo.notnull.message}")
    @DecimalMin(value = "0", message = "{cgstNo.type}")
    @DecimalMax(value = "100", message = "{cgstNo.size}")
    private String cgstNo;

    @NotNull(message = "{sgstNo.notnull.message}")
    @DecimalMin(value = "0", message = "{sgstNo.type}")
    @DecimalMax(value = "100", message = "{sgstNo.size}")
    private String sgstNo;

    @NotNull(message = "{igstNo.notnull.message}")
    @DecimalMin(value = "0", message = "IGST rate cannot be negative")
    @DecimalMax(value = "100", message = "IGST rate cannot exceed 100%")
    private String igstNo;
}
