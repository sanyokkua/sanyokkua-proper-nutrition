package com.kostenko.pp.presentation.json.pojos;

import com.kostenko.pp.data.pojos.Dish;
import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.codehaus.jackson.annotate.JsonProperty;

import java.util.Set;
import java.util.stream.Collectors;

@Data
@Builder
@Slf4j
public class JsonDish {
    private Long dishId;
    private String name;
    @JsonProperty("totalEnergy")
    private double energy;
    @JsonProperty("products")
    private Set<JsonProduct> products;

    public static JsonDish mapFromDish(Dish dish) {
        return JsonDish.builder()
                       .dishId(dish.getDishId())
                       .name(dish.getDishName())
                       .energy(dish.getDishEnergy())
                       .products(dish.getDishProducts().stream()
                                     .map(JsonProduct::mapFromProduct).collect(Collectors.toSet()))
                       .build();

    }

    public Dish mapToDish() {
        Dish dish;
        if (dishId != null) {
            dish = Dish.builder()
                       .dishId(dishId)
                       .dishName(name)
                       .dishEnergy(energy)
                       .dishProducts(products.stream().map(JsonProduct::mapToProduct).collect(Collectors.toList()))
                       .build();
        } else {
            dish = Dish.builder()
                       .dishName(name)
                       .dishEnergy(energy)
                       .dishProducts(products.stream().map(JsonProduct::mapToProduct).collect(Collectors.toList()))
                       .build();
        }
        return dish;
    }
}
