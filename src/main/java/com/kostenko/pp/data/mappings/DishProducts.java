package com.kostenko.pp.data.mappings;

import com.kostenko.pp.data.Constants;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(schema = Constants.SCHEMA, name = Constants.DishProducts.TABLE)
public class DishProducts {

    @EmbeddedId
    private DishProductId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("dishId")
    private Dish dish;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("productId")
    private Product product;

    @Column(name = Constants.DishProducts.AMOUNT)
    private Long amount;

    public DishProducts(Dish dish, Product product) {
        this.dish = dish;
        this.product = product;
        this.id = DishProductId.builder().dishId(dish.getDishId()).productId(product.getProductId()).build();
    }
}
