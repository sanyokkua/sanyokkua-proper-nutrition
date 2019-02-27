package com.kostenko.pp.data.mappings;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(schema = "pp_app", name = "dish_products")
public class DishProducts {

    @EmbeddedId
    private DishProductId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("dishId")
    private Dish dish;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("productId")
    private Product product;

    @Column(name = "amount")
    private Long amount;

    public DishProducts(Dish dish, Product product) {
        this.dish = dish;
        this.product = product;
        this.id = DishProductId.builder().dishId(dish.getDishId()).productId(product.getProductId()).build();
    }
}
