package com.example.e_commerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.e_commerce.entity.OrderItem;
import com.example.e_commerce.entity.Order;
import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrder(Order order);
}
