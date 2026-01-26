package com.app.model;

import java.io.Serializable;
import java.util.Objects;

public class FoodIngredientId implements Serializable {

    private Long food;
    private Long ingredient;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FoodIngredientId)) return false;
        FoodIngredientId that = (FoodIngredientId) o;
        return Objects.equals(food, that.food) &&
               Objects.equals(ingredient, that.ingredient);
    }

    @Override
    public int hashCode() {
        return Objects.hash(food, ingredient);
    }
}
