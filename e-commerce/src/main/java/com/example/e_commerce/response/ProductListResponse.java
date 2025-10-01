package com.example.e_commerce.response;

import java.util.List;

import com.example.e_commerce.entity.Product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductListResponse {

	private List<Product> products;
}