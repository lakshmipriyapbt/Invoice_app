package com.invoicelogin.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ValidateLoginRequest {

    private String userEmail;
    private String token;
}
