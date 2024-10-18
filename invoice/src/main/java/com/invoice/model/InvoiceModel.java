package com.invoice.model;


import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name="invoice_application_invoice")
public class InvoiceModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long invoiceId;  // Auto-incremented Invoice ID

    @ManyToOne
    @JoinColumn(name = "customer_id")  // Foreign key to link the customer table
    private customerModel customer;  // Link to the Customer table

    private String purchaseOrder;  // Purchase Order Number or Reference
    private String vendorCode;  // Vendor Code or Identifier
    private LocalDate invoiceDate;  // Invoice Date
    private String invoiceNumber;  // Unique Invoice Number

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(
            name = "invoice_product",
            joinColumns = @JoinColumn(name = "invoice_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<ProductModel> products;

    private BigDecimal totalAmount;  // Total amount for the invoice
    private String status;  // Invoice status (e.g., Pending, Paid, Cancelled)

    // Default constructor
    public InvoiceModel() {
    }

    // Parameterized constructor
    public InvoiceModel(customerModel customer, String purchaseOrder, String vendorCode, LocalDate invoiceDate,
                        String invoiceNumber, List<ProductModel> products, BigDecimal totalAmount, String status) {
        this.customer = customer;
        this.purchaseOrder = purchaseOrder;
        this.vendorCode = vendorCode;
        this.invoiceDate = invoiceDate;
        this.invoiceNumber = invoiceNumber;
        this.products = products;
        this.totalAmount = totalAmount;
        this.status = status;
    }

    // Getters and Setters

    public Long getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(Long invoiceId) {
        this.invoiceId = invoiceId;
    }

    public customerModel getCustomer() {
        return customer;
    }

    public void setCustomer(customerModel customer) {
        this.customer = customer;
    }

    public String getPurchaseOrder() {
        return purchaseOrder;
    }

    public void setPurchaseOrder(String purchaseOrder) {
        this.purchaseOrder = purchaseOrder;
    }

    public String getVendorCode() {
        return vendorCode;
    }

    public void setVendorCode(String vendorCode) {
        this.vendorCode = vendorCode;
    }

    public LocalDate getInvoiceDate() {
        return invoiceDate;
    }

    public void setInvoiceDate(LocalDate invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public void setInvoiceNumber(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    public List<ProductModel> getProducts() {
        return products;
    }

    public void setProducts(List<ProductModel> products) {
        this.products = products;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

