package com.app.entity;

import java.time.LocalDateTime;

import com.app.enums.OrderStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "order_table")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @ManyToOne
    private User customer;

    @ManyToOne
    private Outlet outlet;

    private String tokenNumber;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private Double totalAmount;

    private String paymentStatus;
    private String paymentMethod;

    private LocalDateTime createdAt = LocalDateTime.now();
}

