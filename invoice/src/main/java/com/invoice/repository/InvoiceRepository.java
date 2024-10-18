package com.thinkconstructive.invoice_application.repository;

import com.thinkconstructive.invoice_application.model.InvoiceModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<InvoiceModel,String> {
}
