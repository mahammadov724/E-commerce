package com.example.e_commerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.e_commerce.entity.Product;
import com.example.e_commerce.repository.ProductRepository;
import com.example.e_commerce.requestDto.ProductRequestDto;
import com.example.e_commerce.response.ProductListResponse;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;

	public void create(ProductRequestDto d) {
		Product product = new Product();
		product.setId(null);
		product.setName(d.getName());
		product.setPrice(d.getPrice());
		product.setImage(d.getImage());
		productRepository.save(product);
	}

	public ProductListResponse getAll() {
		List<Product> products = productRepository.findAll();
		ProductListResponse response = new ProductListResponse();
		response.setProducts(products);
		return response;
	}

}