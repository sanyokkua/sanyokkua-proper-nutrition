package com.kostenko.pp.json;

import com.kostenko.pp.data.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JsonDishProduct {
    private long id;
    private String name;
    private double energy;
    private int amount;
    private long typeId;
    private String typeName;

    public Product mapToProduct() {
        Product product = new Product();
        product.setId(id);
        product.setName(name);
        product.setEnergy(energy);
        product.setTypeId(typeId);
        return product;
    }
}
