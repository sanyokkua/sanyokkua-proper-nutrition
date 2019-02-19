package com.kostenko.pp.data.services;

import com.kostenko.pp.data.RequestInfo;
import com.kostenko.pp.data.entities.Product;
import com.kostenko.pp.data.entities.ProductType;
import com.kostenko.pp.data.repositories.food.ProductJpaRepository;
import com.kostenko.pp.data.repositories.food.ProductTypeJpaRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Objects;

@Service
@Slf4j
public class ProductCrudService {
    private final ProductJpaRepository productJpaRepository;
    private final ProductTypeJpaRepository productTypeJpaRepository;
    private final ProductTypeCrudService productTypeCrudService;

    @Autowired
    public ProductCrudService(ProductJpaRepository productJpaRepository, ProductTypeJpaRepository productTypeJpaRepository, ProductTypeCrudService productTypeCrudService) {
        this.productJpaRepository = Objects.requireNonNull(productJpaRepository);
        this.productTypeJpaRepository = Objects.requireNonNull(productTypeJpaRepository);
        this.productTypeCrudService = Objects.requireNonNull(productTypeCrudService);
    }

    public Product getProductByName(String name) {
        if (StringUtils.isBlank(name)) {
            throw new IllegalArgumentException("Product name is empty");
        }
        Product founded = productJpaRepository.findByName(name);
        if (founded == null) {
            throw new IllegalArgumentException("For product name: '" + name + "' nothing found");
        }
        return founded;
    }

    public Product getProductById(Long id) {
        Objects.requireNonNull(id, "Product id is null");
        return productJpaRepository.getOne(id);
    }

    @Transactional
    public Product createOrUpdateProduct(Product product) {
        if (!isValid(product)) {
            throw new IllegalArgumentException("Product is not valid");
        }
        Product fromDb;
        if (product.getProductId() != null) {
            fromDb = update(product);
        } else {
            fromDb = create(product);
        }
        return fromDb;
    }

    private boolean isValid(Product product) {
        return !Objects.isNull(product)
                && StringUtils.isNotBlank(product.getName())
                && product.getEnergy() != null
                && product.getEnergy() >= 0
                && product.getProductType() != null;
    }

    protected Product create(Product product) {
        Product productFromDatabase = productJpaRepository.findByName(product.getName());
        if (Objects.isNull(productFromDatabase)) {
            ProductType productType = product.getProductType();
            ProductType productTypeFromDatabase;
            if (!productTypeJpaRepository.existsByName(productType.getName())) {
                productTypeFromDatabase = productTypeCrudService.createOrUpdateProductType(productType);
            } else {
                productTypeFromDatabase = productTypeCrudService.getProductTypeByName(productType.getName());
            }
            product.setProductType(productTypeFromDatabase);
            productJpaRepository.save(product);
        } else {
            log.warn("Product already exists. product to save {}", product);
        }
        return productJpaRepository.findByName(product.getName());
    }

    private Product update(Product product) {
        if (!Objects.isNull(product) && !Objects.isNull(product.getProductId())) {
            return productJpaRepository.save(product);
        } else {
            throw new IllegalArgumentException("Product is incorrect: " + product);
        }
    }

    public void deleteProduct(Product product) {
        if (product == null || product.getProductId() == null) {
            throw new IllegalArgumentException("Product is not valid");
        }
        productJpaRepository.deleteById(product.getProductId());
    }

    public Page<Product> getAll(RequestInfo pageInfo) {
        Page<Product> result;
        if (pageInfo.isCombinedSearch()) {
            result = productJpaRepository.findAllByNameIsContainingAndProductType(PageRequest.of(pageInfo.getDbPageNumber(), pageInfo.getRecordsPerPage()), pageInfo.getSearch(), pageInfo.getProductType());
        } else if (pageInfo.hasProductType()) {
            result = productJpaRepository.findAllByProductType(PageRequest.of(pageInfo.getDbPageNumber(), pageInfo.getRecordsPerPage()), pageInfo.getProductType());
        } else if (pageInfo.hasSearch()) {
            result = productJpaRepository.findAllByNameIsContaining(PageRequest.of(pageInfo.getDbPageNumber(), pageInfo.getRecordsPerPage()), pageInfo.getSearch());
        } else {
            result = productJpaRepository.findAll(PageRequest.of(pageInfo.getDbPageNumber(), pageInfo.getRecordsPerPage()));
        }
        return result;
    }
}
