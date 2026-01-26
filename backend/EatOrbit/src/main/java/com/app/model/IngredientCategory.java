package com.app.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ingredient_categories")
public class IngredientCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ingCatId;

    @ManyToOne
    @JoinColumn(name = "outlet_id")
    private Outlet outlet;

    private String categoryName;

	public Long getIngCatId() {
		return ingCatId;
	}

	public void setIngCatId(Long ingCatId) {
		this.ingCatId = ingCatId;
	}

	public Outlet getOutlet() {
		return outlet;
	}

	public void setOutlet(Outlet outlet) {
		this.outlet = outlet;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

    // getters and setters
}
