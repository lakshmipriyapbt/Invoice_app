package com.invoice.repository;

import com.invoice.model.OrderModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<OrderModel, String> {
    Optional<OrderModel> findByInvoiceModel_InvoiceId(Long invoiceId);
}
