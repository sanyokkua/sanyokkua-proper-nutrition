package com.kostenko.pp.data.views;

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
    private String name;
    private List<Product> products;
    private double totalEnergy;
}
