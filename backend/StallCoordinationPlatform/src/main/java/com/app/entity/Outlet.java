package com.app.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "outlets")
public class Outlet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "outlet_id")
    private Long outletId;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;

    @Column(name = "outlet_name", nullable = false)
    private String outletName;

    private String description;

    @Column(name = "cuisine_type")
    private String cuisineType;

    @Column(name = "opening_hours")
    private String openingHours;

    @Column(name = "is_open")
    private Boolean isOpen = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    // getters & setters
}
