package com.kostenko.pp.json.entities;

import com.kostenko.pp.data.views.Product;
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
    private long prodTypeId;
    private String typeName;

    public static JsonProductEntity mapFromProduct(Product product) {
        return JsonProductEntity.builder()
                                .productId(product.getProductId())
                                .name(product.getName())
                                .energy(product.getEnergy())
                                .amount(product.getAmount())
                                .prodTypeId(product.getProdTypeId())
                                .typeName(product.getTypeName())
                                .build();

    }

    public Product mapToProduct() {
        return Product.builder()
                      .productId(productId)
                      .name(name)
                      .energy(energy)
                      .amount(amount)
                      .prodTypeId(prodTypeId)
                      .typeName(typeName)
                      .build();
    }
}
