package com.invoice.controller;

import com.invoice.exception.InvoiceException;
import com.invoice.request.ProductRequest;
import com.invoice.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/product") // Maps all the methods in the class to URLs starting with /product
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("create")
    @Operation(summary = "${api.createProduct.tag}", description = "${api.createProduct.description}")
    @ResponseStatus(HttpStatus.CREATED)
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "OK")
    public ResponseEntity<?> createProduct(@Parameter(required = true, description = "${api.createProductPayload.description}")
                                               @RequestBody @Valid ProductRequest productRequest) throws InvoiceException {
        return productService.createProduct(productRequest);
    }

    @GetMapping("/{productId}")
    @Operation(summary = "${api.getProduct.tag}", description = "${api.getProduct.description}")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "OK")
    public ResponseEntity<?> getProduct(@PathVariable String productId) throws InvoiceException {
        return productService.getProduct(productId);
    }

    @GetMapping("/all")
    @Operation(summary = "${api.getAllProducts.tag}", description = "${api.getAllProducts.description}")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "OK")
    public ResponseEntity<?> getAllProducts() throws InvoiceException {
        return productService.getAllProducts();
    }

    @PatchMapping("/{productId}")
    @Operation(summary = "${api.updateProduct.tag}", description = "${api.updateProduct.description}")
    @ResponseStatus(HttpStatus.OK)
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "OK")
    public ResponseEntity<?> updateProduct(@PathVariable String productId,
            @RequestBody @Valid ProductRequest productRequest) throws InvoiceException, IOException {
        return productService.updateProduct(productId, productRequest);
    }

    @DeleteMapping("/{productId}")
    @Operation(summary = "${api.deleteProduct.tag}", description = "${api.deleteProduct.description}")
    @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "OK")
    public ResponseEntity<?> deleteProduct(@PathVariable String productId) throws InvoiceException {
        return productService.deleteProduct(productId);
    }
}
