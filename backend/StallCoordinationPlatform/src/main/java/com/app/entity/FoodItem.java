package com.app.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "food_items")
public class FoodItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long foodId;

    private String foodName;
    private String description;
    private Double price;

    private Boolean isAvailable = true;
    private Boolean isVeg;
    private Boolean isSeasonal;

    @ManyToOne
    private Outlet outlet;

    @ManyToOne
    private FoodCategory category;
}
