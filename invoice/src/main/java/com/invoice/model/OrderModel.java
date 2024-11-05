package com.invoice.model;

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
@Entity
@Table(name = "invoice_order")
public class OrderModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    private String purchaseDate;
    private String quantity;
    private String cost;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "orderModel")
    private List<ProductModel> product;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "invoiceId", referencedColumnName = "invoiceId", insertable = false, updatable = false)
    private InvoiceModel invoice;
}
