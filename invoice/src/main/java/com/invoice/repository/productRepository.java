package com.thinkconstructive.invoice_application.repository;

import com.thinkconstructive.invoice_application.model.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface productRepository extends JpaRepository<ProductModel, String> {
}
