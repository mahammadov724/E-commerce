package com.example.e_commerce.response;

import com.example.e_commerce.entity.Product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CartResponseDto {
	private Integer id;
	private Integer price;
	private Integer quantity;
	private Double subTotal;
	private Product product;
	
	private Integer userId;
}