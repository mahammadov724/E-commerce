package com.example.e_commerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.e_commerce.entity.Cart;
import com.example.e_commerce.entity.Order;
import com.example.e_commerce.exception.OurRuntimeException;
import com.example.e_commerce.repository.CartRepository;
import com.example.e_commerce.repository.OrderRepository;
import com.example.e_commerce.requestDto.OrderRequestDto;
import com.example.e_commerce.response.UserOrderDto;

@Service
public class OrderService {
	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private OrderRepository orderRepository;

	public void order(OrderRequestDto dto) {
		Cart cart = cartRepository.findById(dto.getCartId())
		.orElseThrow(() -> new OurRuntimeException(null, "cart not found"));
		
		Order order = new Order();
		order.setFirstName(dto.getFirstName());
		order.setLastName(dto.getLastName());
		order.setState(dto.getState());
		order.setCity(dto.getCity());
		order.setAddress(dto.getAddress());
		order.setZip(dto.getZip());
		order.setTel(dto.getTel());
		order.setEmail(dto.getEmail());
		order.setCardNum(dto.getCardNum());
		order.setExpirationMM(dto.getExpirationMM());
		order.setExpirationYY(dto.getExpirationYY());
		order.setCardSecurityCode(dto.getCardSecurityCode());
		order.setCart(cart);
		orderRepository.save(order);
	}

	public List<UserOrderDto> getUserOrders(Integer userId) {
		
		return orderRepository.findOrdersByUserId(userId);
	}

	
}