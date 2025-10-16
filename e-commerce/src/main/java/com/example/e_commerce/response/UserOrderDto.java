package com.example.e_commerce.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserOrderDto {
	private Integer orderId;
    private String firstName;
    private String lastName;
    private String state;
    private String tel;
    private String email;
    private Integer quantity;
    private Double subTotal;
    private String brand;
    private String model;
    private String image;
    private String city;
    private String address;
}