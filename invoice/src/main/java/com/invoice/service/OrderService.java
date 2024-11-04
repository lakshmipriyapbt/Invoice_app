package com.invoice.service;

import com.invoice.exception.InvoiceException;
import com.invoice.model.OrderModel;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface OrderService {

    ResponseEntity<?> createOrder(OrderModel orderModel) throws InvoiceException;

    ResponseEntity<?> getOrderById(String orderId) throws InvoiceException;

    ResponseEntity<List<?>> getOrdersByInvoiceId(String invoiceId) throws InvoiceException;

    ResponseEntity<?> updateOrder(String orderId, OrderModel orderRequest) throws InvoiceException;

    ResponseEntity<?> deleteOrder(String orderId) throws InvoiceException;
}
