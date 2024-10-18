package com.invoice.serviceImpl;

import com.invoice.model.ProductModel;
import com.invoice.repository.productRepository;
import com.invoice.service.productService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class productServiceImpl implements productService {


    productRepository repository;

    @Autowired
    public productServiceImpl(productRepository repository) {
        this.repository = repository;
    }

    @Override
    public String createProduct(ProductModel product) {

        repository.save(product);
        return "Success";
    }

    @Override
    public ProductModel getProduct(String productId) {

        return repository.findById(productId).get();
    }

    @Override
    @Transactional
    public List<ProductModel> getAllProduct() {
        return repository.findAll();
    }

    @Override
    @Transactional
    public String deleteProduct(String productId) {
        repository.deleteById(productId);
        return "Delete Record Successfully";
    }

    @Override
    @Transactional
    public String updateProduct(String productId, ProductModel product){
        // First, check if the customer exists
        if(repository.existsById(productId)){
            // Fetch the existing customer from the database
            ProductModel existingProduct = repository.findById(productId).get();

            // Update the product details
            existingProduct.setProductName(product.getProductName());
            existingProduct.setProductCost(product.getProductCost());
            existingProduct.setHsnNo(product.getHsnNo());
            existingProduct.setCgstNo(product.getCgstNo());
            existingProduct.setSgstNo(product.getSgstNo());
            existingProduct.setIgstNo(product.getIgstNo());

            // Save the updated product in the repository
            repository.save(existingProduct);

            return "Product updated successfully!";
        } else {
            return "Product not found with ID: " + productId;
        }

    }
}
