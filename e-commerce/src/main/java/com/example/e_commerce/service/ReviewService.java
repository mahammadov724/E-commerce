package com.example.e_commerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.e_commerce.entity.Review;
import com.example.e_commerce.repository.ReviewRepository;
import com.example.e_commerce.requestDto.ReviewRequestDto;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public void saveReview(ReviewRequestDto reviewDto) {
        Review review = new Review();
        review.setName(reviewDto.getName());
        review.setEmail(reviewDto.getEmail());
        review.setPhone(reviewDto.getPhone());
        review.setMessage(reviewDto.getMessage());

        reviewRepository.save(review);
    }
}