package com.invoice.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@Table(name = "product")
public class ProductModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    private String productName;
    private String productCost;
    private String HsnNo;
    private String cgstNo;
    private String sgstNo;
    private String igstNo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "orderId", referencedColumnName = "orderId", insertable = false, updatable = false)
    private OrderModel orderModel;


}

