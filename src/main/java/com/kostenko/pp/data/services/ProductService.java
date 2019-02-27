package com.kostenko.pp.data.services;

import com.kostenko.pp.data.PageableSearch;
import com.kostenko.pp.data.repositories.jdbc.ProductRepository;
import com.kostenko.pp.data.repositories.jdbc.ProductTypeRepository;
import com.kostenko.pp.data.views.Product;
import com.kostenko.pp.data.views.ProductType;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.annotation.Nonnull;
import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
public class ProductService implements DBService<Product>, PageableSearch<Product> {
    public static final String NAME = "name";
    public static final String TYPE = "type";
    public static final String PAGE = "page";
    public static final String RECORDS = "records";
    private final ProductRepository productRepository;
    private final ProductTypeRepository productTypeRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, ProductTypeRepository productTypeRepository) {
        this.productRepository = Objects.requireNonNull(productRepository);
        this.productTypeRepository = Objects.requireNonNull(productTypeRepository);
    }

    @Override
    public Product findById(@Nonnull @NonNull Long id) {
        Objects.requireNonNull(id, "Product id is null");
        return productRepository.find(id);
    }

    @Override
    public Product findByField(@Nonnull @NonNull @NotBlank String field) {
        if (StringUtils.isBlank(field)) {
            throw new IllegalArgumentException("Product name is empty");
        }
        Product founded = productRepository.findByField(field);
        if (founded == null) {
            throw new IllegalArgumentException("For product name: '" + field + "' nothing found");
        }
        return founded;
    }

    @Override
    public Product create(@Nonnull @NonNull Product product) {
        if (!isValid(product)) {
            throw new IllegalArgumentException("Product is not valid");
        }
        Product productFromDatabase = productRepository.findByField(product.getName());
        if (Objects.isNull(productFromDatabase)) {
            ProductType productTypeFromDatabase;
            if (product.getProdTypeId() > 0 && !productTypeRepository.isExistsId(product.getProdTypeId())) {
                productTypeFromDatabase = productTypeRepository.create(ProductType.builder().name(product.getTypeName()).build());
            } else if (productTypeRepository.findByField(product.getTypeName()) == null) {
                productTypeFromDatabase = productTypeRepository.create(ProductType.builder().name(product.getTypeName()).build());
            } else {
                productTypeFromDatabase = productTypeRepository.findByField(product.getTypeName());
            }
            product.setProdTypeId(productTypeFromDatabase.getProdTypeId());
            product.setTypeName(productTypeFromDatabase.getName());
            productRepository.create(product);
        } else {
            log.warn("Product already exists. product to save {}", product);
        }
        return productRepository.findByField(product.getName());
    }

    private boolean isValid(Product product) {
        return !Objects.isNull(product)
                && StringUtils.isNotBlank(product.getName())
                && product.getEnergy() >= 0
                && StringUtils.isNotBlank(product.getTypeName());
    }

    @Override
    public Product update(@Nonnull @NonNull Product product) {
        if (!isValid(product)) {
            throw new IllegalArgumentException("Product is not valid");
        }
        return productRepository.update(product);
    }

    @Override
    public void delete(@Nonnull @NonNull Long id) {
        productRepository.delete(id);
    }

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public boolean isExists(@Nonnull @NonNull Product entity) {
        return false;
    }

    @Override
    public Page<Product> findAll(@Nonnull SearchParams searchParams) {
        Page<Product> result;
        int pageNumber = getDbPageNumber(searchParams.getInt(PAGE));
        int recordsPerPage = getRecordsPerPage(searchParams.getInt(RECORDS));

        if (searchParams.hasParam(NAME) && searchParams.hasParam(TYPE)) {
            result = productRepository.findAllByNameIsContainingAndProductType(PageRequest.of(pageNumber, recordsPerPage), searchParams.getString(NAME), searchParams.getLong(TYPE));
        } else if (searchParams.hasParam(TYPE)) {
            result = productRepository.findAllByProductType(PageRequest.of(pageNumber, recordsPerPage), searchParams.getLong(TYPE));
        } else if (searchParams.hasParam(NAME)) {
            result = productRepository.findAllByNameIsContaining(PageRequest.of(pageNumber, recordsPerPage), searchParams.getString(NAME));
        } else {
            result = productRepository.findAllByPage(PageRequest.of(pageNumber, recordsPerPage));
        }
        return result;
    }
}
