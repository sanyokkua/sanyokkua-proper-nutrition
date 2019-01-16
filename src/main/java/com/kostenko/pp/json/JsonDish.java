package com.kostenko.pp.json;

import com.fasterxml.jackson.core.type.TypeReference;
import com.kostenko.pp.data.entity.Dish;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonProperty;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Slf4j
public class JsonDish {
    private Long id;
    private String name;
    @JsonIgnore
    private List<JsonDishProduct> products;
    private double totalEnergy;

    public static JsonDish mapFromDish(Dish dish) {
        List<JsonDishProduct> result = JsonUtils.readListWithType(dish.getProducts(), new TypeReference<List<JsonDishProduct>>() {});
        final Double total = result.stream().map(jsonDishProduct -> (jsonDishProduct.getEnergy() / 100) * jsonDishProduct.getAmount()).reduce(Double::sum).orElse(0d);
        return new JsonDish(dish.getId(), dish.getName(), result, total);
    }

    @JsonProperty("products")
    public List<JsonDishProduct> getProducts() {
        return products;
    }

    @JsonProperty("products")
    public void setProducts(String products) {
        this.products = JsonUtils.readListWithType(products, new TypeReference<List<JsonDishProduct>>() {});
    }

    public Dish mapToDish() {
        Dish dish = new Dish();
        if (id != null) {
            dish.setId(id);
        }
        dish.setName(name);
        final String productsJson = JsonUtils.writeObjectAsString(products);
        dish.setProducts(productsJson);
        return dish;
    }
}
