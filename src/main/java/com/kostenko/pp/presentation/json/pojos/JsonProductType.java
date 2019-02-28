package com.kostenko.pp.presentation.json.pojos;

import com.kostenko.pp.data.pojos.ProductType;
import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@Builder
@Slf4j
public class JsonProductType {
    private long prodTypeId;
    private String name;

    public static JsonProductType mapFromProductType(ProductType productType) {
        return JsonProductType.builder().prodTypeId(productType.getProdTypeId()).name(productType.getProdTypeName()).build();
    }

    public ProductType mapToProductType() {
        return ProductType.builder().prodTypeId(prodTypeId).prodTypeName(name).build();
    }
}
