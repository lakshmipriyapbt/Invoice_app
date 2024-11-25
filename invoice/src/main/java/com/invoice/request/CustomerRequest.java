package com.invoice.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerRequest {

    @NotBlank(message = "{customerName.notnull.message}")
    @Size(min = 2, max = 100, message = "{customerName.size.message}")
    private String customerName;

    @NotBlank(message = "{email.notnull.message}")
    @Email(message = "{email.message}")
    private String email;

    @NotBlank(message = "{mobileNumber.notnull.message}")
    @Pattern(regexp = "^\\d{10}$", message = "{mobileNumber.format}")
    private String mobileNumber;

    @NotBlank(message = "{address.notnull.message}")
    @Size(max = 255, message = "{address.size.message}")
    private String address;

    @NotBlank(message = "{state.notnull.message}")
    private String state;

    @NotBlank(message = "{city.notnull.message}")
    private String city;

    @NotBlank(message = "{pinCode.notnull.message}")
    @Pattern(regexp = "^\\d{6}$", message = "{pinCode.format}")
    private String pinCode;

    @Pattern(regexp = "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$", message = "{gstNo.format}")
    private String gstNo;

    @NotBlank(message = "{stateCode.notnull.message}")
    @Pattern(regexp = "^\\d{2}$", message = "{stateCode.format}")
    private String stateCode;
}

