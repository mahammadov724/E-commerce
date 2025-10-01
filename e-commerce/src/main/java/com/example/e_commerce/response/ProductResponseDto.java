package com.example.e_commerce.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponseDto {
	private Integer id;
	private String brand;
	private String category;
	private Double price;
	private String image;

}