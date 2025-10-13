package com.example.e_commerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.e_commerce.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {
}