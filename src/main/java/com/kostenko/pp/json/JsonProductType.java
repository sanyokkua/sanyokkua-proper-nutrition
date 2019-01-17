package com.kostenko.pp.json;

import com.kostenko.pp.data.entity.ProductType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JsonProductType {
    private long id;
    private String name;

    public static JsonProductType mapFromProductType(ProductType productType) {
        return new JsonProductType(productType.getId(), productType.getName());
    }

    public ProductType mapToProductType() {
        return new ProductType(id, name);
    }
}
