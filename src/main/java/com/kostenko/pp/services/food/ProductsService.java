package com.kostenko.pp.services.food;

import com.google.common.base.Preconditions;
import com.kostenko.pp.data.entity.Product;
import com.kostenko.pp.data.repositories.food.ProductRepository;
import com.kostenko.pp.services.DBService;
import com.kostenko.pp.services.page.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Slf4j
@Service("ProductDBService")
public class ProductsService implements DBService<Product> {
    private final ProductRepository productRepository;

    public ProductsService(ProductRepository productRepository) {
        this.productRepository = Objects.requireNonNull(productRepository, "Instead of ProductRepository instance injected null");
    }

    @Override
    public Product findById(Long id) {
        Preconditions.checkNotNull(id, "ID can't be null");
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public Product create(Product data) {
        validate(data);
        Product dbProduct = productRepository.findByNameAndTypeId(data.getName(), data.getTypeId());
        if (dbProduct == null) {
            dbProduct = productRepository.save(data);
        } else {
            throw new IllegalArgumentException("Product with id " + data.getId() + " doesn't exists. Update can't be done");
        }
        return dbProduct;
    }

    @Override
    public Product update(Product data) {
        validate(data);
        Product dbProduct = productRepository.findById(data.getId()).orElse(null);
        if (dbProduct == null) {
            throw new IllegalArgumentException("Product with id " + data.getId() + " doesn't exists. Update can't be done");
        } else {
            dbProduct = productRepository.save(data);
        }
        return dbProduct;
    }

    @Override
    public Page<Product> getAll(PageInfo pageInfo) {
        long typeId = 0;
        try {
            typeId = Long.parseLong(pageInfo.getParam(PageInfo.TYPE_ID));
        } catch (NumberFormatException ex) {
            log.warn("Problem with parsing typeid", ex);
        }
        String searchString = pageInfo.getParam(PageInfo.SEARCH_STRING);
        Page<Product> page;
        if (StringUtils.isBlank(searchString)) {
            if (typeId == 0) {
                page = productRepository.findAll(PageRequest.of(pageInfo.getDbPageNumber(), pageInfo.getRecordsPerPage()));
            } else {
                page = productRepository.findAllByTypeId(PageRequest.of(pageInfo.getDbPageNumber(), pageInfo.getRecordsPerPage()), typeId);
            }
        } else {
            if (typeId == 0) {
                page = productRepository.findAllByNameIsContaining(PageRequest.of(pageInfo.getDbPageNumber(), pageInfo.getRecordsPerPage()), searchString);
            } else {
                page = productRepository.findAllByNameIsContainingAndTypeId(PageRequest.of(pageInfo.getDbPageNumber(), pageInfo.getRecordsPerPage()), searchString, typeId);
            }
        }
        return page;
    }

    @Override
    public void delete(Product data) {
        validate(data);
        final Product dbProduct = productRepository.findById(data.getId()).orElse(null);
        if (dbProduct == null) {
            throw new IllegalArgumentException("Product with id " + data.getId() + " doesn't exists. Delete can't be done");
        } else {
            productRepository.delete(dbProduct);
        }
    }

    private void validate(Product product) {
        if (!isValid(product)) {
            throw new IllegalArgumentException("Product has invalid fields: " + product.toString());
        }
    }

    private boolean isValid(Product product) {
        return product != null && StringUtils.isNotBlank(product.getName()) && product.getEnergy() >= 0 && product.getTypeId() != null;
    }

}

