package com.kostenko.pp.data.views;

import com.kostenko.pp.data.entities.ProductType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    private long productId;
    private String name;
    private double energy;
    private long amount;
    private long prodTypeId;
    private String typeName;

    public com.kostenko.pp.data.entities.Product map(){
        return com.kostenko.pp.data.entities.Product.builder().productId(productId).name(name).energy(energy).productType(ProductType.builder().prodTypeId(prodTypeId).name(typeName).build()).build();
    }
}
