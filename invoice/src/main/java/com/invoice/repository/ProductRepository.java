package com.invoice.repository;

import com.invoice.model.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface productRepository extends JpaRepository<ProductModel, String> {
}
