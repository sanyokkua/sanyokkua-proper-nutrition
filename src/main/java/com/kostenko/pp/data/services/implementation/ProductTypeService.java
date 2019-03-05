package com.kostenko.pp.data.services.implementation;

import com.kostenko.pp.data.pojos.ProductType;
import com.kostenko.pp.data.repositories.jdbc.ProductTypeRepository;
import com.kostenko.pp.data.services.DBService;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Nonnull;
import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Objects;

import static java.util.Objects.isNull;

@Service
@Slf4j
public class ProductTypeService implements DBService<ProductType> {
    private final ProductTypeRepository productTypeJpaRepository;

    @Autowired
    public ProductTypeService(ProductTypeRepository productTypeJpaRepository) {
        this.productTypeJpaRepository = Objects.requireNonNull(productTypeJpaRepository);
    }

    @Override
    public ProductType findById(@Nonnull @NonNull Long id) {
        return productTypeJpaRepository.find(id);
    }

    @Override
    public ProductType findByField(@Nonnull @NonNull @NotBlank String field) {
        if (StringUtils.isBlank(field)) {
            throw new IllegalArgumentException("ProductType name is empty");
        }
        return productTypeJpaRepository.findByField(field);
    }

    @Override
    public ProductType create(@Nonnull @NonNull ProductType entity) {
        if (StringUtils.isBlank(entity.getProdTypeName())) {
            throw new IllegalArgumentException("Given ProductType has blank name");
        }
        ProductType fromDb = productTypeJpaRepository.findByField(entity.getProdTypeName());
        if (isNull(fromDb)) {
            fromDb = productTypeJpaRepository.create(entity);
        }
        return fromDb;
    }

    @Override
    public ProductType update(@Nonnull @NonNull ProductType entity) {
        if (StringUtils.isBlank(entity.getProdTypeName())) {
            throw new IllegalArgumentException("Given ProductType has blank name");
        }
        ProductType fromDb = productTypeJpaRepository.find(entity.getProdTypeId());
        if (isNull(fromDb)) {
            throw new IllegalArgumentException("ProductType with id: " + entity.getProdTypeId() + " is not exists");
        }
        fromDb.setProdTypeName(entity.getProdTypeName());
        fromDb = productTypeJpaRepository.update(fromDb);
        return fromDb;
    }

    @Override
    public void delete(@Nonnull @NonNull Long id) {
        productTypeJpaRepository.delete(id);
    }

    @Override
    public List<ProductType> findAll() {
        return productTypeJpaRepository.findAll();
    }

    @Override
    public boolean isExists(@Nonnull @NonNull ProductType entity) {
        boolean result = false;
        if (!isNull(entity.getProdTypeId())) {
            result = productTypeJpaRepository.isExistsId(entity.getProdTypeId());
        } else if (StringUtils.isNotBlank(entity.getProdTypeName())) {
            result = !isNull(productTypeJpaRepository.findByField(entity.getProdTypeName()));
        }
        return result;
    }
}
