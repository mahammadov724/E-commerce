package com.example.e_commerce.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.e_commerce.entity.OrderItem;
import com.example.e_commerce.service.OrderItemService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/orderItem")
@RequiredArgsConstructor
public class OrderItemController {

    private final OrderItemService orderItemService;

    @GetMapping("/getAll")
    public ResponseEntity<List<OrderItem>> getAll() {
        return ResponseEntity.ok(orderItemService.getAll());
    }

    @GetMapping("/getByOrder/{orderId}")
    public ResponseEntity<List<OrderItem>> getByOrder(@PathVariable Integer orderId) {
        return ResponseEntity.ok(orderItemService.getAllByOrderId(orderId));
    }

    @PostMapping("/create")
    public ResponseEntity<OrderItem> create(@RequestBody OrderItem item) {
        return ResponseEntity.ok(orderItemService.create(item));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        orderItemService.delete(id);
        return ResponseEntity.ok().build();
    }
}
