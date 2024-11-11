package com.invoice.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@Table(name = "customer")
public class CustomerModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerId;
    private String customerName;
    private String email;
    private String mobileNumber;
    private String address;
    private String state;
    private String city;
    private String pinCode;
    private String gstNo;
    private String stateCode;

    @OneToMany(mappedBy = "customer",orphanRemoval = true,cascade = CascadeType.ALL)
    private List<InvoiceModel> invoiceModel;


}