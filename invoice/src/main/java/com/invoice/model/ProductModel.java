package com.thinkconstructive.invoice_application.model;


import jakarta.persistence.*;

@Entity
@Table(name="invoice_application_product")
public class ProductModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // This makes the ID auto-increment in the database
    private Long id;  // Changed type to Long for auto-incremented IDs

    private String productName;
    private String productCost;
    private String hsnNo;
    private String cgstNo;
    private String sgstNo;
    private String igstNo;


    public ProductModel() {
    }

    public ProductModel(Long id, String productName, String productCost, String hsnNo, String cgstNo, String sgstNo, String igstNo) {
        this.id = id;
        this.productName = productName;
        this.productCost = productCost;
        this.hsnNo = hsnNo;
        this.cgstNo = cgstNo;
        this.sgstNo = sgstNo;
        this.igstNo = igstNo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public  String getProductCost() {
        return productCost;
    }

    public void setProductCost(String productCost) {
        this.productCost = productCost;
    }

    public String getHsnNo() {
        return hsnNo;
    }

    public void setHsnNo(String hsnNo) {
        this.hsnNo = hsnNo;
    }

    public String getCgstNo() {
        return cgstNo;
    }

    public void setCgstNo(String cgstNo) {
        this.cgstNo = cgstNo;
    }

    public String getSgstNo() {
        return sgstNo;
    }

    public void setSgstNo(String sgstNo) {
        this.sgstNo = sgstNo;
    }

    public String getIgstNo() {
        return igstNo;
    }

    public void setIgstNo(String igstNo) {
        this.igstNo = igstNo;
    }
}