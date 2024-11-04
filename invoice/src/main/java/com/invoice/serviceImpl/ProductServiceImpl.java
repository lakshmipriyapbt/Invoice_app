package com.invoice.serviceImpl;

import com.invoice.exception.InvoiceErrorMessageKey;
import com.invoice.exception.InvoiceException;
import com.invoice.model.ProductModel;
import com.invoice.repository.ProductRepository;  // Note: Fixed the naming convention here
import com.invoice.request.ProductRequest;  // Import the ProductRequest
import com.invoice.service.ProductService;  // Fixed naming convention
import com.invoice.common.ResponseBuilder;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class ProductServiceImpl implements ProductService {  // Fixed naming convention

    private final ProductRepository repository;  // Fixed naming convention

    @Autowired
    public ProductServiceImpl(ProductRepository repository) {
        this.repository = repository;
    }

    @Override
    public ResponseEntity<?> createProduct(@Valid ProductRequest productRequest) {
        log.debug("Creating product: {}", productRequest);
        // Convert ProductRequest to ProductModel
        ProductModel product = new ProductModel();
        product.setProductName(productRequest.getProductName());
        product.setProductCost(productRequest.getProductCost());
        product.setHsnNo(productRequest.getHsnNo());
        product.setCgstNo(productRequest.getCgstNo());
        product.setSgstNo(productRequest.getSgstNo());
        product.setIgstNo(productRequest.getIgstNo());
        repository.save(product);
        return new ResponseEntity<>(
                ResponseBuilder.builder().build().createSuccessResponse("Product created successfully!"),
                HttpStatus.CREATED
        );
    }

    @Override
    public ResponseEntity<?> getProduct(String productId) throws InvoiceException {
        log.info("Fetching product with ID: {}", productId);
        Optional<ProductModel> product = repository.findById(productId);
        if (product.isPresent()) {
            return new ResponseEntity<>(
                    ResponseBuilder.builder().build().createSuccessResponse(product.get()),
                    HttpStatus.OK
            );
        } else {
            throw new InvoiceException(InvoiceErrorMessageKey.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> getAllProducts() {
        log.info("Fetching all products");
        List<ProductModel> products = repository.findAll();
        return new ResponseEntity<>(
                ResponseBuilder.builder().build().createSuccessResponse(products),
                HttpStatus.OK
        );
    }

    @Override
    @Transactional
    public ResponseEntity<?> deleteProduct(String productId) throws InvoiceException {
        log.info("Deleting product with ID: {}", productId);
        if (repository.existsById(productId)) {
            repository.deleteById(productId);
            return new ResponseEntity<>(
                    ResponseBuilder.builder().build().createSuccessResponse("Deleted record successfully"),
                    HttpStatus.OK
            );
        } else {
            throw new InvoiceException(InvoiceErrorMessageKey.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> updateProduct(String productId, @Valid ProductRequest productRequest) throws InvoiceException {
        log.info("Updating product with ID: {}", productId);
        Optional<ProductModel> existingProduct = repository.findById(productId);

        if (existingProduct.isPresent()) {
            ProductModel productToUpdate = existingProduct.get();
            // Update the fields
            productToUpdate.setProductName(productRequest.getProductName());
            productToUpdate.setProductCost(productRequest.getProductCost());
            productToUpdate.setHsnNo(productRequest.getHsnNo());
            productToUpdate.setCgstNo(productRequest.getCgstNo());
            productToUpdate.setSgstNo(productRequest.getSgstNo());
            productToUpdate.setIgstNo(productRequest.getIgstNo());
            repository.save(productToUpdate);
            return new ResponseEntity<>(
                    ResponseBuilder.builder().build().createSuccessResponse("Product updated successfully!"),
                    HttpStatus.OK
            );
        } else {
            throw new InvoiceException(InvoiceErrorMessageKey.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
    }
}
