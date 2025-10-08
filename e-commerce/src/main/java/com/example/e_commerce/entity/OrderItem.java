package com.example.e_commerce.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private Product product; 

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    private Integer quantity;
    private Double subTotal;

    @PrePersist
    @PreUpdate
    public void calculateSubTotal() {
        if (product != null && product.getPrice() != null && quantity != null) {
            this.subTotal = product.getPrice() * quantity;
        }
    }
}
