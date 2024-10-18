package com.invoice.model;

import jakarta.persistence.*;

@Entity
@Table(name="invoice_application_customer")
public class customerModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // This makes the ID auto-increment in the database
    private Long id;  // Changed type to Long for auto-incremented IDs

    private String customerName;
    private String email;
    private String mobileNumber;
    private String address;
    private String state;
    private String city;
    private String pinCode;
    private String gstno;
    private String stateCode;

    // Default constructor
    public customerModel() {
    }

    // Constructor with fields except for 'id' since it will be auto-generated
    public customerModel(String customerName, String email, String mobileNumber, String address, String state, String city, String pinCode, String gstno, String stateCode) {
        this.customerName = customerName;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.address = address;
        this.state = state;
        this.city = city;
        this.pinCode = pinCode;
        this.gstno = gstno;
        this.stateCode = stateCode;
    }

    // Getters and Setters for all fields

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPinCode() {
        return pinCode;
    }

    public void setPinCode(String pinCode) {
        this.pinCode = pinCode;
    }

    public String getGstno() {
        return gstno;
    }

    public void setGstno(String gstno) {
        this.gstno = gstno;
    }

    public String getStateCode() {
        return stateCode;
    }

    public void setStateCode(String stateCode) {
        this.stateCode = stateCode;
    }
}
