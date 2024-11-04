package com.invoice.repository;

import com.invoice.model.ProductModel;
import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel, String> {

    @Query("SELECT p FROM ProductModel p WHERE p.HsnNo = :HsnNo")
    Optional<ProductModel> findByHsnNo(@Param("HsnNo") String HsnNo);
}
