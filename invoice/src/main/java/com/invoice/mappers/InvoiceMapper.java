package com.invoice.mappers;

import com.invoice.model.InvoiceModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface InvoiceMapper {
    @Mapping(target = "status", constant = "Pending")  // Set default status to "Pending"
    InvoiceModel toInvoiceModel(InvoiceModel request);
    void updateInvoiceFromModel(InvoiceModel source, @MappingTarget InvoiceModel target);

}
