package com.invoice.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "invoice_order")
public class OrderModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @Column(nullable = false)
    private String productId;
    private String purchaseDate;
    private String quantity;
    private String cost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productId", referencedColumnName = "productId", insertable = false, updatable = false)
    private ProductModel product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoiceId", nullable = false)
    private InvoiceModel invoice;
}
