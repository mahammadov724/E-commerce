package com.example.e_commerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.e_commerce.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}