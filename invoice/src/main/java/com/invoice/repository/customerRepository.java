package com.invoice.repository;

import com.invoice.model.customerModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface customerRepository extends JpaRepository<customerModel,String> {
}
