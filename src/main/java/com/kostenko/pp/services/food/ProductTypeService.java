package com.kostenko.pp.services.food;

import com.google.common.base.Preconditions;
import com.kostenko.pp.data.entity.ProductType;
import com.kostenko.pp.data.repositories.food.ProductRepository;
import com.kostenko.pp.data.repositories.food.ProductTypeRepository;
import com.kostenko.pp.services.DBService;
import com.kostenko.pp.services.page.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Slf4j
@Service
public class ProductTypeService implements DBService<ProductType> {
    private final ProductTypeRepository productTypeRepository;
    private final ProductRepository productRepository;

    @Autowired
    public ProductTypeService(ProductTypeRepository productTypeRepository, ProductRepository productRepository) {
        this.productTypeRepository = Objects.requireNonNull(productTypeRepository, "Instead of ProductTypeRepository instance injected null");
        this.productRepository = Objects.requireNonNull(productRepository, "Instead of ProductRepository instance injected null");
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
