package com.kostenko.pp.json.entities;

import com.kostenko.pp.data.views.Dish;
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
        return JsonDishEntity.builder()
                             .dishId(dish.getDishId())
                             .name(dish.getName())
                             .energy(dish.getTotalEnergy())
                             .products(dish.getProducts().stream()
                                           .map(JsonProductEntity::mapFromProduct).collect(Collectors.toSet()))
                             .build();

    }

    public Dish mapToDish() {
        Dish dish;
        if (dishId != null) {
            dish = Dish.builder()
                       .dishId(dishId)
                       .name(name)
                       .totalEnergy(energy)
                       .products(products.stream().map(JsonProductEntity::mapToProduct).collect(Collectors.toList()))
                       .build();
        } else {
            dish = Dish.builder()
                       .name(name)
                       .totalEnergy(energy)
                       .products(products.stream().map(JsonProductEntity::mapToProduct).collect(Collectors.toList()))
                       .build();
        }
        return dish;
    }
}
