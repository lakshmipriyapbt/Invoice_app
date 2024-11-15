package com.invoice.mappers;

import com.invoice.model.OrderModel;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    void updateOrderFromModel(OrderModel source, @MappingTarget OrderModel target);
}

