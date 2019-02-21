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
    private JsonProductTypeEntity productType;

    public static JsonProductEntity mapFromProduct(Product product) {
        return JsonProductEntity.builder()
                                .productId(product.getProductId())
                                .name(product.getName())
                                .energy(product.getEnergy())
                                .amount(product.getAmount())
                                .productType(JsonProductTypeEntity.builder().prodTypeId(product.getProdTypeId()).name(product.getTypeName()).build())
                                .build();

    }

    public Product mapToProduct() {
        return Product.builder()
                      .productId(productId)
                      .name(name)
                      .energy(energy)
                      .amount(amount)
                      .prodTypeId(productType.getProdTypeId())
                      .typeName(productType.getName())
                      .build();
    }
}
