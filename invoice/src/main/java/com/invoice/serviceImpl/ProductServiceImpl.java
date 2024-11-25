package com.invoice.serviceImpl;

import com.invoice.exception.InvoiceErrorMessageKey;
import com.invoice.exception.InvoiceException;
import com.invoice.mappers.ProductMapper;
import com.invoice.model.ProductModel;
import com.invoice.repository.ProductRepository;
import com.invoice.request.ProductRequest;
import com.invoice.service.ProductService;
import com.invoice.common.ResponseBuilder;
import com.invoice.util.Constants;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repository;
    private final ProductMapper productMapper;

    @Autowired
    public ProductServiceImpl(ProductRepository repository, ProductMapper productMapper) {
        this.repository = repository;
        this.productMapper = productMapper;
    }

    @Override
    public ResponseEntity<?> createProduct(@Valid ProductRequest productRequest) {
        log.debug("Creating product: {}", productRequest);
        try {
            ProductModel product = new ProductModel();
            product.setProductName(productRequest.getProductName());
            product.setProductCost(productRequest.getProductCost());
            product.setHsnNo(productRequest.getHsnNo());
            product.setGst(productRequest.getGst());
            BigDecimal totalCost = calculateTotalCost(product);
            product.setUnitCost(totalCost);

            log.debug("Product to save: {}", product);
            ProductModel savedProduct = repository.save(product);

            log.info("Product created successfully with ID: {}", savedProduct.getProductId());
            return new ResponseEntity<>(ResponseBuilder.builder().build().createSuccessResponse(Constants.CREATE_SUCCESS), HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Error occurred while creating product: {}", e.getMessage(), e);
            return new ResponseEntity<>(ResponseBuilder.builder().build().failureResponse(InvoiceErrorMessageKey.CREATE_FAILED), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    private BigDecimal calculateTotalCost(ProductModel product) {
        BigDecimal productCost = parseToBigDecimal(product.getProductCost());
        BigDecimal gstPercentage = parseToBigDecimal(product.getGst());
        // Calculate the GST amount (productCost * gstPercentage / 100)
        BigDecimal gstAmount = productCost.multiply(gstPercentage).divide(BigDecimal.valueOf(100));
        // Add the GST amount to the product cost
        return productCost.add(gstAmount);
    }
    private BigDecimal parseToBigDecimal(String value) {
        return value != null && !value.isEmpty() ? new BigDecimal(value) : BigDecimal.ZERO;
    }

    @Override
    public ResponseEntity<?> getProduct(String productId) throws InvoiceException {
        log.info("Fetching product with ID: {}", productId);
        Optional<ProductModel> product = repository.findById(productId);
        if (product.isPresent()) {
            ProductModel productData = product.get();
            productData.setOrderModels(null);
            return ResponseEntity.ok(productData);
        } else {
            log.error("Error: {} - Product not found for productId: {}", InvoiceErrorMessageKey.PRODUCT_NOT_FOUND, productId);
            throw new InvoiceException(InvoiceErrorMessageKey.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> getAllProducts() throws InvoiceException {
        log.info("Fetching all products");
        try {
            List<ProductModel> products = repository.findAll();
            if (products == null || products.isEmpty()) {
                log.info("No product found in the database.");
                return ResponseEntity.ok(Collections.emptyList());
            }
            List<Map<String, Object>> responseList = products.stream()
                    .map(productMapper::toResponseMap)
                    .collect(Collectors.toList());
            log.info("All products fetched successfully, total count: {}", responseList.size());
            return new ResponseEntity<>(ResponseBuilder.builder().build().createSuccessResponse(responseList), HttpStatus.OK);
        } catch (Exception e) {
            log.error("An error occurred while fetching all products: {}", e.getMessage(), e);
            throw new InvoiceException(InvoiceErrorMessageKey.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> deleteProduct(String productId) throws InvoiceException {
        log.info("Deleting product with ID: {}", productId);
        if (repository.existsById(productId)) {
            repository.deleteById(productId);
            log.info("All products fetched successfully, total count: {}");
            return new ResponseEntity<>(ResponseBuilder.builder().build().createSuccessResponse(Constants.DELETE_SUCCESS), HttpStatus.OK);
        } else {
            log.error("Error: {} - Product not found for productId: {}", InvoiceErrorMessageKey.PRODUCT_NOT_FOUND, productId);
            throw new InvoiceException(InvoiceErrorMessageKey.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> updateProduct(String productId, @Valid ProductRequest productRequest) throws InvoiceException {
        log.info("Updating product with ID: {}", productId);
        try {
            ProductModel productToUpdate = repository.findById((productId)).orElseThrow(() -> new InvoiceException(InvoiceErrorMessageKey.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND));
            if (productRequest.getProductName() != null) {
                productToUpdate.setProductName(productRequest.getProductName());
            }
            if (productRequest.getProductCost() != null) {
                productToUpdate.setProductCost(productRequest.getProductCost());
            }
            if (productRequest.getHsnNo() != null) {
                productToUpdate.setHsnNo(productRequest.getHsnNo());
            }
            if (productRequest.getGst() != null) {
                productToUpdate.setGst(productRequest.getGst());
            }
            BigDecimal totalCost = calculateTotalCost(productToUpdate);
            productToUpdate.setUnitCost(totalCost);
            repository.save(productToUpdate);

            log.info("Product updated successfully with ID: {}", productId);
            return new ResponseEntity<>(ResponseBuilder.builder().build().createSuccessResponse(Constants.UPDATE_SUCCESS), HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error occurred while updating product: {}", e.getMessage(), e);
            throw new InvoiceException(InvoiceErrorMessageKey.ERROR_CREATING_PRODUCT + e.getMessage(), e);
        }
    }
}
