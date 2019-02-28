package com.kostenko.pp.data.pojos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Dish {
    private long dishId;
    private String dishName;
    private List<Product> dishProducts;
    private double dishEnergy;
}
