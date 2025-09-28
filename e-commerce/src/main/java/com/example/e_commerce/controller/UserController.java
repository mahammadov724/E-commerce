package com.example.e_commerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.e_commerce.exception.OurRuntimeException;
import com.example.e_commerce.requestDto.UserRequestDto;
import com.example.e_commerce.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/users")
@CrossOrigin(origins = "*")
public class UserController {

	@Autowired
	private UserService userService;
	
	@PostMapping(path = "/register")
	public void createUser(@Valid @RequestBody UserRequestDto dto,BindingResult br)  {
		if (br.hasErrors()) {
			throw new OurRuntimeException(br,"");
		}
		userService.create(dto);
	}
	
	@PostMapping(path = "/login")
	public String userLogin(@RequestBody UserRequestDto d) {
		return userService.login(d);
	}
}