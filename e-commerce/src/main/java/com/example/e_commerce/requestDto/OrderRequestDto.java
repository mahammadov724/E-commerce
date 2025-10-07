package com.example.e_commerce.requestDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class OrderRequestDto {
	@NotNull
	private Integer cartId;
	@Size(min = 2, max = 20, message = "FirstName must be min 2 max 20 characters")
	private String firstName;
	@Size(min = 2, max = 20, message = "LastName must be min 2 max 20 characters")
	private String lastName;
	@NotBlank(message = "State not blank")
	private String state;
	@NotBlank(message = "City not blank")
	private String city;
	@NotBlank(message = "Address not blank")
	private String address; 
	@NotBlank(message = "Can not be empty zip code")
	private String zip;
	@NotBlank(message = "Phone not blank")
	private String tel;
	@Pattern(regexp = "[a-zA-Z]+@[a-z]+\\.[a-z]{2,4}")
	private String email;
	@NotBlank(message = "Can not be empty cart number")
	private String cardNum;
	@NotBlank(message = "Can not empty expiry month")
	private String expirationMM;
	@NotNull(message = "ExpiryYear cannot be null.")
	private String expirationYY;
	@NotNull(message = "Card security code cannot be null")
	private Integer cardSecurityCode;
	
}