package com.example.e_commerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.e_commerce.exception.OurRuntimeException;
import com.example.e_commerce.requestDto.OrderRequestDto;
import com.example.e_commerce.service.OrderService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/orders")
@CrossOrigin(origins = "*")
public class OrderController {

	@Autowired
	private OrderService orderService;
	
	@PostMapping(path = "/add")
	public ResponseEntity<String> order(@Valid @RequestBody OrderRequestDto dto, BindingResult br){
		if (br.hasErrors()) {
			throw new OurRuntimeException(br, "melumatlarin tamliginda problem var");
		}
		orderService.order(dto);
		return ResponseEntity.ok("Order was created successfully");
	}
}