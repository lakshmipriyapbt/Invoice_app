package com.invoice.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@Table(name = "invoice")
public class InvoiceModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long invoiceId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customerId")
    private CustomerModel customer;

    private String purchaseOrder;
    private String vendorCode;
    private LocalDate invoiceDate;
    private String invoiceNumber;

    @OneToOne(mappedBy = "invoiceModel", cascade = CascadeType.ALL, orphanRemoval = true)
    private OrderModel orderModel;

    private String totalAmount;
    private String status;
}
