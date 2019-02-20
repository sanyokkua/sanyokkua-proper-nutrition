package com.kostenko.pp.json.entities;

import com.kostenko.pp.data.entities.Dish;
import com.kostenko.pp.data.entities.Product;
import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.codehaus.jackson.annotate.JsonProperty;

import java.util.Set;
import java.util.stream.Collectors;

@Data
@Builder
@Slf4j
public class JsonDishEntity {
    private Long dishId;
    private String name;
    @JsonProperty("totalEnergy")
    private double energy;
    @JsonProperty("products")
    private Set<JsonProductEntity> products;

    public static JsonDishEntity mapFromDish(Dish dish) {
        Set<Product> products = dish.getProducts();
        Set<JsonProductEntity> productsSet = products.stream()
                                                     .map(product -> JsonProductEntity
                                                             .builder()
                                                             .productId(product.getProductId())
                                                             .name(product.getName())
                                                             .energy(product.getEnergy())
                                                             .productType(JsonProductTypeEntity.mapFromProductType(product.getProductType()))
                                                             .build()).collect(Collectors.toSet());
        Long dishId = dish.getDishId();
        String name = dish.getName();
        final Double total = productsSet.stream().map(jsonDishProduct -> (jsonDishProduct.getEnergy() / 100) * jsonDishProduct.getAmount()).reduce(Double::sum).orElse(0d);
        return JsonDishEntity.builder().dishId(dishId).name(name).products(productsSet).energy(total).build();
    }

    public Dish mapToDish() {
        Set<Product> resultSet = products.stream()
                                         .map(jsonDishProduct -> Product.builder()
                                                                        .productId(jsonDishProduct.getProductId())
                                                                        .name(jsonDishProduct.getName())
                                                                        .energy(jsonDishProduct.getEnergy())
                                                                        .productType(jsonDishProduct.getProductType().mapToProductType())
                                                                        .build())
                                         .collect(Collectors.toSet());
        Dish dish;
        if (dishId != null) {
            dish = Dish.builder().dishId(dishId).name(name).products(resultSet).build();
        } else {
            dish = Dish.builder().name(name).products(resultSet).build();
        }
        return dish;
    }
}
