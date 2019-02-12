package com.kostenko.pp.json.entities;

import com.kostenko.pp.data.entities.ProductType;
import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@Builder
@Slf4j
public class JsonProductTypeEntity {
    private long prodTypeId;
    private String name;

    public static JsonProductTypeEntity mapFromProductType(ProductType productType) {
        return JsonProductTypeEntity.builder().prodTypeId(productType.getProdTypeId()).name(productType.getName()).build();
    }

    public ProductType mapToProductType() {
        return ProductType.builder().prodTypeId(prodTypeId).name(name).build();
    }
}
