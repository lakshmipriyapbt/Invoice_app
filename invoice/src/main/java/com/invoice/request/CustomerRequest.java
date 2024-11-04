package com.invoice.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerRequest {

    @NotBlank(message = "Customer name is mandatory")
    @Size(min = 2, max = 100, message = "Customer name must be between 2 and 100 characters")
    private String customerName;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Mobile number is mandatory")
    @Pattern(regexp = "^\\d{10}$", message = "Mobile number must be a 10-digit number")
    private String mobileNumber;

    @NotBlank(message = "Address is mandatory")
    @Size(max = 255, message = "Address can be a maximum of 255 characters")
    private String address;

    @NotBlank(message = "State is mandatory")
    private String state;

    @NotBlank(message = "City is mandatory")
    private String city;

    @NotBlank(message = "Pin code is mandatory")
    @Pattern(regexp = "^\\d{6}$", message = "Pin code must be a valid 6-digit number")
    private String pinCode;

    @NotBlank(message = "GST number is mandatory")
    @Pattern(regexp = "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$", message = "GST number must be valid")
    private String gstNo;

    @NotBlank(message = "State code is mandatory")
    @Pattern(regexp = "^\\d{2}$", message = "State code must be a valid 2-digit number")
    private String stateCode;
}

