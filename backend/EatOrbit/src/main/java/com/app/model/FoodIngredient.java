package com.app.model;

import jakarta.persistence.*;

@Entity
@Table(name = "food_ingredients")
@IdClass(FoodIngredientId.class)
public class FoodIngredient {

    @Id
    @ManyToOne
    @JoinColumn(name = "food_id")
    private FoodItem food;

    @Id
    @ManyToOne
    @JoinColumn(name = "ingredient_id")
    private IngredientItem ingredient;

    // getters and setters
}
