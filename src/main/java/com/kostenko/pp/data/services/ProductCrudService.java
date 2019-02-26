package com.kostenko.pp.data.services;

import com.kostenko.pp.data.RequestInfo;
import com.kostenko.pp.data.entities.Product;
import com.kostenko.pp.data.entities.ProductType;
import com.kostenko.pp.data.repositories.jdbc.ProductRepository;
import com.kostenko.pp.data.repositories.jdbc.ProductTypeRepository;
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
    private final ProductRepository productRepository;
    private final ProductTypeRepository productTypeRepository;

    @Autowired
    public ProductCrudService(ProductRepository productRepository, ProductTypeRepository productTypeRepository) {
        this.productRepository = Objects.requireNonNull(productRepository);
        this.productTypeRepository = Objects.requireNonNull(productTypeRepository);
    }

    public Product getProductByName(String name) {
        if (StringUtils.isBlank(name)) {
            throw new IllegalArgumentException("Product name is empty");
        }
        Product founded = productRepository.findByUniqueField(name).orElse(null);
        if (founded == null) {
            throw new IllegalArgumentException("For product name: '" + name + "' nothing found");
        }
        return founded;
    }

    public Product getProductById(Long id) {
        Objects.requireNonNull(id, "Product id is null");
        return productRepository.findById(id).orElse(null);
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
        Product productFromDatabase = productRepository.findByUniqueField(product.getName()).orElse(null);
        if (Objects.isNull(productFromDatabase)) {
            ProductType productType = product.getProductType();
            ProductType productTypeFromDatabase;
            if (!productTypeRepository.isExists(productType)) {
                productTypeFromDatabase = productTypeRepository.create(productType).orElse(null);
            } else {
                productTypeFromDatabase = productTypeRepository.findByUniqueField(productType.getName()).orElse(null);
            }
            product.setProductType(productTypeFromDatabase);
            productRepository.create(product);
        } else {
            log.warn("Product already exists. product to save {}", product);
        }
        return productRepository.findByUniqueField(product.getName()).orElse(null);
    }

    private Product update(Product product) {
        if (!Objects.isNull(product) && !Objects.isNull(product.getProductId())) {
            return productRepository.update(product).orElse(null);
        } else {
            throw new IllegalArgumentException("Product is incorrect: " + product);
        }
    }

    public void deleteProduct(Product product) {
        if (product == null || product.getProductId() == null) {
            throw new IllegalArgumentException("Product is not valid");
        }
        productRepository.deleteById(product.getProductId());
    }

    public Page<Product> getAll(RequestInfo pageInfo) {
        Page<Product> result;
        if (pageInfo.isCombinedSearch()) {
            result = productRepository.findAllByNameIsContainingAndProductType(PageRequest.of(pageInfo.getDbPageNumber(), pageInfo.getRecordsPerPage()), pageInfo.getSearch(), pageInfo.getProductType().getProdTypeId());
        } else if (pageInfo.hasProductType()) {
            result = productRepository.findAllByProductType(PageRequest.of(pageInfo.getDbPageNumber(), pageInfo.getRecordsPerPage()), pageInfo.getProductType().getProdTypeId());
        } else if (pageInfo.hasSearch()) {
            result = productRepository.findAllByNameIsContaining(PageRequest.of(pageInfo.getDbPageNumber(), pageInfo.getRecordsPerPage()), pageInfo.getSearch());
        } else {
            result = productRepository.findAllByPage(PageRequest.of(pageInfo.getDbPageNumber(), pageInfo.getRecordsPerPage()));
        }
        return result;
    }
}
