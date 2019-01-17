package com.kostenko.pp.services;

import com.google.common.base.Preconditions;
import com.kostenko.pp.data.entity.ProductType;
import com.kostenko.pp.data.repositories.ProductRepository;
import com.kostenko.pp.data.repositories.ProductTypeRepository;
import com.kostenko.pp.services.page.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ProductTypeService implements DBService<ProductType> {
    private final ProductTypeRepository productTypeRepository;
    private final ProductRepository productRepository;

    @Autowired
    public ProductTypeService(ProductTypeRepository productTypeRepository, ProductRepository productRepository) {
        Preconditions.checkNotNull(productTypeRepository, "productTypeRepository is null");
        Preconditions.checkNotNull(productRepository, "productRepository is null");
        this.productTypeRepository = productTypeRepository;
        this.productRepository = productRepository;
    }

    @Override
    public ProductType findById(Long id) {
        Preconditions.checkNotNull(id, "ID can't be null");
        return productTypeRepository.findById(id).orElse(null);
    }

    @Override
    public ProductType create(ProductType data) {
        ProductType dbProductType = productTypeRepository.findByName(data.getName());
        if (dbProductType == null) {
            dbProductType = productTypeRepository.save(data);
        } else {
            throw new IllegalArgumentException("Type already exists");
        }
        return dbProductType;
    }

    @Override
    public ProductType update(ProductType data) {
        ProductType dbProductType = productTypeRepository.findById(data.getId()).orElse(null);
        if (dbProductType == null) {
            throw new IllegalArgumentException("ProductType with id " + data.getId() + " doesn't exists. Update can't be done");
        } else {
            dbProductType = productTypeRepository.save(data);
        }
        return dbProductType;
    }

    @Override
    public Page<ProductType> getAll(PageInfo pageInfo) {
        return productTypeRepository.findAll(PageRequest.of(0, Integer.MAX_VALUE));
    }

    @Override
    public void delete(ProductType data) {
        final ProductType exProd = productTypeRepository.findById(data.getId()).orElse(null);
        if (exProd == null) {
            throw new IllegalArgumentException("ProductType with id " + data.getId() + " doesn't exists. Delete can't be done");
        } else {
            long numberOfRecordsWithType = productRepository.countAllByTypeId(data.getId());
            if (numberOfRecordsWithType < 1) {
                productTypeRepository.delete(exProd);
            } else {
                throw new IllegalArgumentException("Type can't be deleted till it in use");
            }
        }
    }
}
