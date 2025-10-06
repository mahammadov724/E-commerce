package com.example.e_commerce.requestDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartRequestDto {
	
	private Integer id;
	private Integer productId;
	private Integer price;
	private Integer quantity;
	private Double subTotal;
	
}