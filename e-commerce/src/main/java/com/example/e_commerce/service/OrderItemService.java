package com.example.e_commerce.service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.example.e_commerce.entity.Order;
import com.example.e_commerce.entity.OrderItem;
import com.example.e_commerce.entity.Product;
import com.example.e_commerce.repository.OrderItemRepository;
import com.example.e_commerce.repository.OrderRepository;
import com.example.e_commerce.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public List<OrderItem> getAllByOrderId(Integer orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order tapılmadı"));
        return orderItemRepository.findByOrder(order);
    }

    public List<OrderItem> getAll() {
        return orderItemRepository.findAll();
    }

    public OrderItem create(OrderItem item) {
        if (item.getOrder() == null || item.getOrder().getId() == null) {
            throw new RuntimeException("Order məlumatı boş ola bilməz");
        }

        if (item.getProduct() == null || item.getProduct().getId() == null) {
            throw new RuntimeException("Product məlumatı boş ola bilməz");
        }

        Order order = orderRepository.findById(item.getOrder().getId())
                .orElseThrow(() -> new RuntimeException("Order tapılmadı"));
        Product product = productRepository.findById(item.getProduct().getId())
                .orElseThrow(() -> new RuntimeException("Product tapılmadı"));

        item.setOrder(order);
        item.setProduct(product);

        item.setSubTotal(product.getPrice() * item.getQuantity());

        return orderItemRepository.save(item);
    }

    public void delete(Integer id) {
        if (!orderItemRepository.existsById(id)) {
            throw new RuntimeException("OrderItem tapılmadı");
        }
        orderItemRepository.deleteById(id);
    }

	
}
