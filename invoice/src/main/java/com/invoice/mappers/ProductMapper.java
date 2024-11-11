package com.invoice.mappers;

import com.invoice.model.ProductModel;
import com.invoice.request.ProductRequest;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductModel toProductModel(ProductRequest request);
    void updateProductFromRequest(ProductRequest source, @MappingTarget ProductModel target);
}

