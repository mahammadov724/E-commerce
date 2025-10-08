package com.example.e_commerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.e_commerce.requestDto.ProductRequestDto;
import com.example.e_commerce.response.ProductListResponse;
import com.example.e_commerce.response.ProductResponseDto;
import com.example.e_commerce.service.ProductService;

@RestController
@RequestMapping(path = "/products")
@CrossOrigin(origins = "*")
public class ProductController {

	@Autowired
	private ProductService productService;
	
	@PostMapping(path = "/create")
	public void createProduct(@RequestBody ProductRequestDto d) {
		productService.create(d);
	}
	
	@GetMapping(path = "/getAll")
	public ProductListResponse getAllProduct(){
		return productService.getAll();
	}
	
	@GetMapping(path = "/getById/{id}")
	public ProductResponseDto getProduct(@PathVariable Integer id) {
		return productService.get(id);
	}
	
	@PutMapping(path = "/update")
	public void updateProduct(@RequestBody ProductRequestDto dto) {
		productService.update(dto);
	}
	
	@DeleteMapping(path = "/delete/{id}")
	public void deleteProduct(@PathVariable Integer id) {
		productService.delete(id);
	}
	
	@GetMapping(path = "/all")
	public ProductListResponse getAll() {
		return productService.getAllProduct();
	}
	
	@GetMapping(path = "/search")
	public List<ProductResponseDto> searchProduct(@RequestParam(name = "query") String query){
		return productService.search(query);
	}
	
	@GetMapping(path = "/sort")
	public List<ProductResponseDto> sortedProduct(@RequestParam(name = "sort",required = false) String sort){
		return productService.sortedProduct(sort);
	}
	
}