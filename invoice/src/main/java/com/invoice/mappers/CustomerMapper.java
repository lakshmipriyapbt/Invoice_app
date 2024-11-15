package com.invoice.mappers;

import com.invoice.model.CustomerModel;
import com.invoice.request.CustomerRequest;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    void updateCustomerFromRequest(CustomerRequest request, @MappingTarget CustomerModel customer);
    CustomerModel toCustomerModel(CustomerRequest request);
}


