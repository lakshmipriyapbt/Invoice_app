package com.invoice.controller;

import com.invoice.exception.InvoiceException;
import com.invoice.model.OrderModel;
import com.invoice.request.OrderRequest;
import com.invoice.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/order") // Maps all methods in the class to URLs starting with /order
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("create")
    @Operation(summary = "${api.createOrder.tag}", description = "${api.createOrder.description}")
    @ResponseStatus(HttpStatus.CREATED)
    @ApiResponse(responseCode = "201", description = "Order created successfully")
    public ResponseEntity<?> createOrder(@Parameter(required = true, description = "${api.createOrderPayload.description}")
                                         @RequestBody @Valid OrderModel orderRequest) throws InvoiceException {
        return orderService.createOrder(orderRequest);
    }

    @GetMapping("/{orderId}")
    @Operation(summary = "${api.getOrder.tag}", description = "${api.getOrder.description}")
    @ApiResponse(responseCode = "200", description = "Order retrieved successfully")
    public ResponseEntity<?> getOrderById(@PathVariable String orderId) throws InvoiceException {
        return orderService.getOrderById(orderId);
    }

    @GetMapping("/invoice/{invoiceId}")
    @Operation(summary = "${api.getOrdersByInvoiceId.tag}", description = "${api.getOrdersByInvoiceId.description}")
    @ApiResponse(responseCode = "200", description = "Orders retrieved successfully for the invoice")
    public ResponseEntity<List<?>> getOrdersByInvoiceId(@PathVariable String invoiceId) throws InvoiceException {
        return orderService.getOrdersByInvoiceId(invoiceId);
    }

    @PatchMapping("/{orderId}")
    @Operation(summary = "${api.updateOrder.tag}", description = "${api.updateOrder.description}")
    @ResponseStatus(HttpStatus.OK)
    @ApiResponse(responseCode = "200", description = "Order updated successfully")
    public ResponseEntity<?> updateOrder(@PathVariable String orderId,
                                         @RequestBody @Valid OrderModel orderModel) throws InvoiceException, IOException {
        return orderService.updateOrder(orderId, orderModel);
    }

    @DeleteMapping("/{orderId}")
    @Operation(summary = "${api.deleteOrder.tag}", description = "${api.deleteOrder.description}")
    @ApiResponse(responseCode = "200", description = "Order deleted successfully")
    public ResponseEntity<?> deleteOrder(@PathVariable String orderId) throws InvoiceException {
        return orderService.deleteOrder(orderId);
    }
}
