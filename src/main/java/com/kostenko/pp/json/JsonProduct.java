package com.kostenko.pp.json;

import com.kostenko.pp.data.entity.Product;
import com.kostenko.pp.data.entity.ProductType;
import com.kostenko.pp.data.repositories.ProductTypeRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Optional;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JsonProduct {
    private Long id;
    private String name;
    private Double energy;
    private Long typeId;
    private String typeName;

    public static JsonProduct mapFromProduct(Product product, ProductTypeRepository productTypeRepository) {
        String productTypeName = "";
        if (productTypeRepository != null) {
            Optional<ProductType> productType = productTypeRepository.findById(product.getTypeId());
            if (productType.isPresent()) {
                productTypeName = productType.get().getName();
            }
        }
        return new JsonProduct(product.getId(), product.getName(), product.getEnergy(), product.getTypeId(), productTypeName);
    }

    public Product mapToProduct() {
        return new Product(id, name, energy, typeId);
    }
}
