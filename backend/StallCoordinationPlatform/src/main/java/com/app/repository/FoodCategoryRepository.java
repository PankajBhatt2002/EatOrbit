package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.FoodCategory;

public interface FoodCategoryRepository extends JpaRepository<FoodCategory, Long>{

}
