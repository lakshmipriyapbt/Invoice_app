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

    @NotBlank(message = "Product name is mandatory")
    @Size(min = 2, max = 100, message = "Product name must be between 2 and 100 characters")
    private String productName;

    @NotNull(message = "Product cost is mandatory")
    @Positive(message = "Product cost must be positive")
    private String productCost;

    @NotBlank(message = "HSN number is mandatory")
    @Pattern(regexp = "^\\d{4}$", message = "HSN number must be a valid 4-digit number")
    private String hsnNo;

    @NotNull(message = "CGST rate is mandatory")
    @DecimalMin(value = "0", message = "CGST rate cannot be negative")
    @DecimalMax(value = "100", message = "CGST rate cannot exceed 100%")
    private String cgstNo;

    @NotNull(message = "SGST rate is mandatory")
    @DecimalMin(value = "0", message = "SGST rate cannot be negative")
    @DecimalMax(value = "100", message = "SGST rate cannot exceed 100%")
    private String sgstNo;

    @NotNull(message = "IGST rate is mandatory")
    @DecimalMin(value = "0", message = "IGST rate cannot be negative")
    @DecimalMax(value = "100", message = "IGST rate cannot exceed 100%")
    private String igstNo;
}
