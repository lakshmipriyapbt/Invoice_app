package com.invoice.controller;

import com.invoice.model.ProductModel;
import com.invoice.service.productService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class productController {

    productService service;

    public productController(productService service) {
        this.service = service;
    }

    @GetMapping("{productId}")
    public ProductModel getProduct(@PathVariable String productId){
        return service.getProduct(productId);
    }
    @GetMapping("/all")
    public List<ProductModel> getAllProduct(){
        return service.getAllProduct();
    }

    @PostMapping("/create")
    public String createProduct(@RequestBody ProductModel product){
        service.createProduct(product);
        return "Product Created Successfully";
    }

    @PutMapping("/update/{productId}")
    public String updateProduct(@PathVariable("productId") String productId, @RequestBody ProductModel product){

        return service.updateProduct(productId,product);
    }

    @DeleteMapping("/{productId}")
    public String deleteProduct(@PathVariable String productId){
        return service.deleteProduct(productId);
    }

}
