package com.kostenko.pp.data.services;

import com.kostenko.pp.data.entities.ProductType;
import com.kostenko.pp.data.repositories.food.ProductTypeJpaRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@Slf4j
public class ProductTypeCrudService {
    private final ProductTypeJpaRepository productTypeJpaRepository;

    @Autowired
    public ProductTypeCrudService(ProductTypeJpaRepository productTypeJpaRepository) {
        this.productTypeJpaRepository = Objects.requireNonNull(productTypeJpaRepository);
    }

    public ProductType getProductTypeById(Long id) {
        Objects.requireNonNull(id, "ProductType id is null");
        return productTypeJpaRepository.getOne(id);
    }

    public ProductType getProductTypeByName(String name) {
        if (StringUtils.isBlank(name)) {
            throw new IllegalArgumentException("ProductType name is empty");
        }
        return productTypeJpaRepository.findByName(name);
    }

    public ProductType createOrUpdateProductType(ProductType productType) {
        if (StringUtils.isBlank(productType.getName())) {
            throw new IllegalArgumentException("Given ProductType has blank name");
        }
        ProductType fromDb;
        if (!Objects.isNull(productType.getProdTypeId())) {
            if (productTypeJpaRepository.existsById(productType.getProdTypeId())) {
                fromDb = productTypeJpaRepository.getOne(productType.getProdTypeId());
                fromDb.setName(productType.getName());
                fromDb = productTypeJpaRepository.save(fromDb);
            } else {
                throw new IllegalArgumentException("ProductType with id: " + productType.getProdTypeId() + " is not exists");
            }
        } else {
            ProductType foundedByName = productTypeJpaRepository.findByName(productType.getName());
            if (foundedByName == null) {
                fromDb = productTypeJpaRepository.save(productType);
            } else {
                fromDb = foundedByName;
            }
        }
        return fromDb;
    }

}
