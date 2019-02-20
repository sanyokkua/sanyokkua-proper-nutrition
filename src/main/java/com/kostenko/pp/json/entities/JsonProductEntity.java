package com.kostenko.pp.json.entities;

import com.kostenko.pp.data.entities.Product;
import com.kostenko.pp.data.entities.ProductType;
import com.kostenko.pp.data.repositories.food.ProductTypeCrudRepository;
import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@Builder
@Slf4j
public class JsonProductEntity {
    private long productId;
    private String name;
    private double energy;
    private long amount;
    private JsonProductTypeEntity productType;

    public static JsonProductEntity mapFromProduct(Product product, ProductTypeCrudRepository productTypeCrudRepository) {
        ProductType productType = product.getProductType();
        JsonProductTypeEntity jsonProductTypeEntity = JsonProductTypeEntity.builder()
                                                                           .prodTypeId(productType.getProdTypeId())
                                                                           .name(productType.getName())
                                                                           .build();
        return JsonProductEntity.builder()
                                .productId(product.getProductId())
                                .name(product.getName())
                                .energy(product.getEnergy())
                                .productType(jsonProductTypeEntity)
                                .build();
    }

    public Product mapToProduct() {
        ProductType productType = ProductType.builder().prodTypeId(this.productType.getProdTypeId()).name(this.productType.getName()).build();
        return Product.builder().productId(productId).name(name).energy(energy).productType(productType).build();
    }
}
