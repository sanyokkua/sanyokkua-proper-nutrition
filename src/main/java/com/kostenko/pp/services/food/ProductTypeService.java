package com.kostenko.pp.services.food;

import com.google.common.base.Preconditions;
import com.kostenko.pp.data.entities.ProductType;
import com.kostenko.pp.data.repositories.food.ProductCrudRepository;
import com.kostenko.pp.data.repositories.food.ProductTypeCrudRepository;
import com.kostenko.pp.services.DBService;
import com.kostenko.pp.services.page.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Slf4j
@Service
public class ProductTypeService implements DBService<ProductType> {
    private final ProductTypeCrudRepository productTypeCrudRepository;
    private final ProductCrudRepository productCrudRepository;

    @Autowired
    public ProductTypeService(ProductTypeCrudRepository productTypeCrudRepository, ProductCrudRepository productCrudRepository) {
        this.productTypeCrudRepository = Objects.requireNonNull(productTypeCrudRepository, "Instead of ProductTypeRepository instance injected null");
        this.productCrudRepository = Objects.requireNonNull(productCrudRepository, "Instead of ProductRepository instance injected null");
    }

    @Override
    public ProductType findById(Long id) {
        Preconditions.checkNotNull(id, "ID can't be null");
        return productTypeCrudRepository.findById(id).orElse(null);
    }

    @Override
    public ProductType create(ProductType data) {
        ProductType dbProductType = productTypeCrudRepository.findByName(data.getName());
        if (dbProductType == null) {
            dbProductType = productTypeCrudRepository.save(data);
        } else {
            throw new IllegalArgumentException("Type already exists");
        }
        return dbProductType;
    }

    @Override
    public ProductType update(ProductType data) {
        ProductType dbProductType = productTypeCrudRepository.findById(data.getProdTypeId()).orElse(null);
        if (dbProductType == null) {
            throw new IllegalArgumentException("ProductType with id " + data.getProdTypeId() + " doesn't exists. Update can't be done");
        } else {
            dbProductType = productTypeCrudRepository.save(data);
        }
        return dbProductType;
    }

    @Override
    public ProductType createOrUpdate(ProductType data) {
        ProductType result = null;
        if (data.getProdTypeId() != null) {
            result = productTypeCrudRepository.findById(data.getProdTypeId()).orElse(null);
        } else if (StringUtils.isNotBlank(data.getName())) {
            result = productTypeCrudRepository.findByName(data.getName());
        }
        if (result != null) {
            result = save(data);
        } else {
            throw new IllegalArgumentException("ProductType with id " + data.getProdTypeId() + " doesn't exists. Update can't be done");
        }
        return result;
    }

    @Override
    public Page<ProductType> getAll(PageInfo pageInfo) {
        return productTypeCrudRepository.findAll(PageRequest.of(0, Integer.MAX_VALUE));
    }

    @Override
    public void delete(ProductType data) {
        final ProductType exProd = productTypeCrudRepository.findById(data.getProdTypeId()).orElse(null);
        if (exProd == null) {
            throw new IllegalArgumentException("ProductType with id " + data.getProdTypeId() + " doesn't exists. Delete can't be done");
        } else {
            long numberOfRecordsWithType = productCrudRepository.countAllByProductType(data);
            if (numberOfRecordsWithType < 1) {
                productTypeCrudRepository.delete(exProd);
            } else {
                throw new IllegalArgumentException("Type can't be deleted till it in use");
            }
        }
    }

    public ProductType save(ProductType productType){
        return productTypeCrudRepository.save(productType);
    }
}
