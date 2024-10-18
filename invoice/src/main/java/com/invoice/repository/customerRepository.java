package com.thinkconstructive.invoice_application.repository;

import com.thinkconstructive.invoice_application.model.customerModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface customerRepository extends JpaRepository<customerModel,String> {
}
