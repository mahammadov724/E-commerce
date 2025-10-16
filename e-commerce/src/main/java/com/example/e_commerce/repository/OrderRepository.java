package com.example.e_commerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.e_commerce.entity.Order;
import com.example.e_commerce.response.UserOrderDto;

public interface OrderRepository extends JpaRepository<Order, Integer> {
	@Query("""
		    SELECT new com.example.e_commerce.response.UserOrderDto(
		        o.id,
		        o.firstName,
		        o.lastName,
		        o.state,
		        o.tel,
		        o.email,
		        c.quantity,
		        c.subTotal,
		        p.brand,
		        p.model,
		        p.image,
		        o.city,
		        o.address
		    )
		    FROM com.example.e_commerce.entity.Order o
		    JOIN o.cart c
		    JOIN c.product p
		    WHERE p.userId = ?1
		""")
	List<UserOrderDto> findOrdersByUserId(Integer userId);
}