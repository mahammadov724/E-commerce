package com.example.e_commerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.e_commerce.requestDto.CartRequestDto;
import com.example.e_commerce.response.CartResponseDto;
import com.example.e_commerce.service.CartService;

@RestController
@RequestMapping(path = "/cart")
@CrossOrigin(origins = "*")
public class CartController {
	
	@Autowired
	private CartService cartService;
 
	@PostMapping(path = "/add")
	public ResponseEntity<String> addToCart(@RequestBody CartRequestDto dto){
		cartService.addToCart(dto);
		return ResponseEntity.ok("Product add to cart successfully");
	}
	
	@GetMapping(path = "/getCart") 
	public List<CartResponseDto> getCart(){
		return cartService.getCart();
	}
	
	@PutMapping(path = "/update")
	public void update(@RequestBody CartRequestDto dto) {
		cartService.update(dto);
	}
	
	@DeleteMapping(path = "/delete/{id}")
	public void deleteFromCart(@PathVariable Integer id) {
		cartService.delete(id);
	}
}