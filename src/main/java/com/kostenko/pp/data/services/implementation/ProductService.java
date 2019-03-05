package com.kostenko.pp.data.services.implementation;

import com.kostenko.pp.data.pojos.Product;
import com.kostenko.pp.data.pojos.ProductType;
import com.kostenko.pp.data.repositories.jdbc.ProductRepository;
import com.kostenko.pp.data.repositories.jdbc.ProductTypeRepository;
import com.kostenko.pp.data.services.PageableDBService;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.annotation.Nonnull;
import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Objects;

import static java.util.Objects.isNull;

@Service
@Slf4j
public class ProductService implements PageableDBService<Product> {
    public static final String NAME = "name";
    public static final String TYPE = "type";
    public static final String PAGE = "page";
    public static final String RECORDS = "records";
    private final ProductRepository productRepository;
    private final ProductTypeRepository productTypeRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, ProductTypeRepository productTypeRepository) {
        this.productRepository = Objects.requireNonNull(productRepository, "Injected null");
        this.productTypeRepository = Objects.requireNonNull(productTypeRepository, "Injected null");
    }

    @Override
    public Product findById(@Nonnull @NonNull Long id) {
        return productRepository.find(id);
    }

    @Override
    public Product findByField(@Nonnull @NonNull @NotBlank String field) {
        if (StringUtils.isBlank(field)) {
            throw new IllegalArgumentException("Product name is empty");
        }
        return productRepository.findByField(field);
    }

    @Override
    public Product create(@Nonnull @NonNull Product product) {
        if (isValid(product)) {
            Product productFromDatabase = productRepository.findByField(product.getProductName());
            if (Objects.isNull(productFromDatabase)) {
                ProductType productTypeFromDatabase;
                if (product.getProdTypeId() > 0 && !productTypeRepository.isExistsId(product.getProdTypeId())) {
                    productTypeFromDatabase = productTypeRepository.create(ProductType.builder().prodTypeName(product.getProdTypeName()).build());
                } else if (isNull(productTypeRepository.findByField(product.getProdTypeName()))) {
                    productTypeFromDatabase = productTypeRepository.create(ProductType.builder().prodTypeName(product.getProdTypeName()).build());
                } else {
                    productTypeFromDatabase = productTypeRepository.findByField(product.getProdTypeName());
                }
                if (Objects.isNull(productTypeFromDatabase)) {
                    throw new IllegalArgumentException("ProductType is null");
                }
                product.setProdTypeId(productTypeFromDatabase.getProdTypeId());
                product.setProdTypeName(productTypeFromDatabase.getProdTypeName());
                productRepository.create(product);
            } else {
                log.warn("Product already exists. product to save {}", product);
            }
            return productRepository.findByField(product.getProductName());
        } else {
            throw new IllegalArgumentException("Product is not valid");
        }
    }

    private boolean isValid(Product product) {
        return !Objects.isNull(product)
                && StringUtils.isNotBlank(product.getProductName())
                && product.getProductEnergy() >= 0
                && StringUtils.isNotBlank(product.getProdTypeName());
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
        log.info("Deleting product with id: {}", id);
        boolean isDeleted = productRepository.delete(id);
        log.info("Product with id: {} is deleted: {}", id, isDeleted);
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
        log.info("searching all records with options: {}", searchParams.toString());
        Pageable pageable = PageRequest.of(pageNumber, recordsPerPage);
        result = productRepository.findByPages().begin(pageable).addName(searchParams.getString(NAME)).addProductType(searchParams.getLong(TYPE)).invoke();
        return result;
    }
}
