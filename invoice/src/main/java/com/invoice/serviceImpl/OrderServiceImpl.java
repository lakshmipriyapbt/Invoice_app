package com.invoice.serviceImpl;

import com.invoice.exception.InvoiceErrorMessageKey;
import com.invoice.exception.InvoiceException;
import com.invoice.mappers.OrderMapper;
import com.invoice.model.OrderModel;
import com.invoice.model.ProductModel;
import com.invoice.repository.OrderRepository;
import com.invoice.repository.ProductRepository;
import com.invoice.repository.InvoiceRepository;
import com.invoice.service.OrderService;
import com.invoice.common.ResponseBuilder;
import com.invoice.util.Constants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final InvoiceRepository invoiceRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, ProductRepository productRepository, InvoiceRepository invoiceRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.invoiceRepository = invoiceRepository;
    }

//    @Override
//    public ResponseEntity<?> createOrder(OrderModel orderModel) throws InvoiceException {
//        log.info("Creating order: {}", orderModel);
//
//        // Find ProductModel using productId and HSN number
//        Optional<ProductModel> productOpt = productRepository.findByHsnNo(orderModel.getProduct().getHsnNo());
//        if (productOpt.isEmpty()) {
//            throw new InvoiceException(InvoiceErrorMessageKey.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND);
//        }
//
//        // Find InvoiceModel by invoiceId
//        Optional<InvoiceModel> invoiceOpt = invoiceRepository.findById(String.valueOf(orderModel.getInvoice().getInvoiceId()));
//        if (invoiceOpt.isEmpty()) {
//            throw new InvoiceException(InvoiceErrorMessageKey.INVOICE_NOT_FOUND, HttpStatus.NOT_FOUND);
//        }
//
//        // Set the OrderModel properties
//        orderModel.setProduct(productOpt.get());
//        orderModel.setInvoice(invoiceOpt.get());
//
//        orderRepository.save(orderModel);
//
//        return new ResponseEntity<>(
//                ResponseBuilder.builder().build().createSuccessResponse("Order created successfully!"),
//                HttpStatus.CREATED
//        );
//    }

    @Override
    public ResponseEntity<?> getOrderById(String orderId) throws InvoiceException {
        log.info("Fetching order with ID: {}", orderId);
        return orderRepository.findById(orderId)
                .map(order -> new ResponseEntity<>(order, HttpStatus.OK))
                .orElseThrow(() -> new InvoiceException(InvoiceErrorMessageKey.ORDER_NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    @Override
    @Transactional
    public ResponseEntity<?> getOrdersByInvoiceId(String invoiceId) throws InvoiceException {
        log.info("Fetching all orders for invoice ID: {}", invoiceId);
        if (!invoiceRepository.existsById(invoiceId)) {
            throw new InvoiceException(InvoiceErrorMessageKey.INVOICE_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        Optional<OrderModel> orders = orderRepository.findByInvoiceModel_InvoiceId(Long.valueOf(invoiceId));
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @Autowired
    private OrderMapper orderMapper;

    @Override
    @Transactional
    public ResponseEntity<?> updateOrder(String orderId, OrderModel orderModel) throws InvoiceException {
        log.info("Updating order with ID: {}", orderId);

        OrderModel order = orderRepository.findById(orderId)
                .orElseThrow(() -> new InvoiceException(InvoiceErrorMessageKey.ORDER_NOT_FOUND, HttpStatus.NOT_FOUND));

        // Find ProductModel for update reference
        ProductModel product = productRepository.findByHsnNo(orderModel.getProduct().getFirst().getHsnNo())
                .orElseThrow(() -> new InvoiceException(InvoiceErrorMessageKey.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND));

        // Map fields from orderModel to the existing order
        orderMapper.updateOrderFromModel(orderModel, order);
        order.setProduct(Collections.singletonList(product));  // Update the product reference as needed

        orderRepository.save(order);

        return new ResponseEntity<>(
                ResponseBuilder.builder().build().createSuccessResponse(Constants.UPDATE_SUCCESS),
                HttpStatus.OK
        );
    }

    @Override
    @Transactional
    public ResponseEntity<?> deleteOrder(String orderId) throws InvoiceException {
        log.info("Deleting order with ID: {}", orderId);
        if (!orderRepository.existsById(orderId)) {
            throw new InvoiceException(InvoiceErrorMessageKey.ORDER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        orderRepository.deleteById(orderId);
        return new ResponseEntity<>(
                ResponseBuilder.builder().build().createSuccessResponse(Constants.DELETE_SUCCESS),
                HttpStatus.OK
        );
    }
}
