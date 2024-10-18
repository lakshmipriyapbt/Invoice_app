package com.thinkconstructive.invoice_application.service;

import com.thinkconstructive.invoice_application.model.ProductModel;
import jakarta.transaction.Transactional;

import java.util.List;

public interface productService {

     String createProduct(ProductModel product);
      ProductModel getProduct(String productId);
      List<ProductModel> getAllProduct();
      String deleteProduct(String productId);
     // String updateProduct(String productId, productModel product);

    @Transactional
    String updateProduct(String productId, ProductModel product);
}
