package com.example.e_commerce.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.e_commerce.entity.Product;
import com.example.e_commerce.exception.OurRuntimeException;
import com.example.e_commerce.repository.ProductRepository;
import com.example.e_commerce.requestDto.ProductRequestDto;
import com.example.e_commerce.response.ProductListResponse;
import com.example.e_commerce.response.ProductResponseDto;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;

	public void create(ProductRequestDto d) {
		Product product = new Product();
		product.setId(null);
		product.setBrand(d.getBrand());
		product.setCategory(d.getCategory());
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
	
	public ProductResponseDto get(Integer id) {
		if (id == null || id<=0) {
			throw new OurRuntimeException(null, "id mutleqdir");
		}
		Optional<Product> byId = productRepository.findById(id);
		ProductResponseDto response = new ProductResponseDto();
		if (byId.isPresent()) {
			Product product = byId.get();
			response.setId(product.getId());
			response.setBrand(product.getBrand());
			response.setCategory(product.getCategory());
			response.setPrice(product.getPrice());
			response.setImage(product.getImage());
		}else {
			throw new OurRuntimeException(null, "id tapilmadi");
		}
		return response;
	}
}