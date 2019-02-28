package com.kostenko.pp.presentation.json.pojos;

import com.kostenko.pp.data.pojos.Product;
import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@Builder
@Slf4j
public class JsonProduct {
    private long productId;
    private String name;
    private double energy;
    private long amount;
    private long prodTypeId;
    private String typeName;

    public static JsonProduct mapFromProduct(Product product) {
        return JsonProduct.builder()
                          .productId(product.getProductId())
                          .name(product.getProductName())
                          .energy(product.getProductEnergy())
                          .amount(product.getProductAmount())
                          .prodTypeId(product.getProdTypeId())
                          .typeName(product.getProdTypeName())
                          .build();

    }

    public Product mapToProduct() {
        return Product.builder()
                      .productId(productId)
                      .productName(name)
                      .productEnergy(energy)
                      .productAmount(amount)
                      .prodTypeId(prodTypeId)
                      .prodTypeName(typeName)
                      .build();
    }
}
