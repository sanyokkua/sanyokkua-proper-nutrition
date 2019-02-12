package com.kostenko.pp.services.food;

import com.google.common.base.Preconditions;
import com.kostenko.pp.data.entities.Product;
import com.kostenko.pp.data.entities.ProductType;
import com.kostenko.pp.data.repositories.food.ProductRepository;
import com.kostenko.pp.data.repositories.food.ProductTypeRepository;
import com.kostenko.pp.services.DBService;
import com.kostenko.pp.services.page.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.Objects;

@Slf4j
@Service("ProductDBService")
@org.springframework.transaction.annotation.Transactional
public class ProductsService implements DBService<Product> {
    private final ProductRepository productRepository;
    private final ProductTypeRepository productTypeRepository;
    @PersistenceContext
    private EntityManager em;


    public ProductsService(ProductRepository productRepository, ProductTypeRepository productTypeRepository) {
        this.productRepository = Objects.requireNonNull(productRepository, "Instead of ProductRepository instance injected null");
        this.productTypeRepository = Objects.requireNonNull(productTypeRepository, "Instead of ProductTypeRepository instance injected null");
    }

    @Override
    public Product findById(Long id) {
        Preconditions.checkNotNull(id, "ID can't be null");
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public Product create(Product data) {
        validate(data);
        Product dbProduct = productRepository.findByNameAndProductType(data.getName(), data.getProductType());
        if (dbProduct == null) {
            dbProduct = productRepository.save(data);
        } else {
            throw new IllegalArgumentException("Product with id " + data.getProductId() + " doesn't exists. Update can't be done");
        }
        return dbProduct;
    }

    @Override
    public Product update(Product data) {
        validate(data);
        Product dbProduct = productRepository.findById(data.getProductId()).orElse(null);
        if (dbProduct == null) {
            throw new IllegalArgumentException("Product with id " + data.getProductId() + " doesn't exists. Update can't be done");
        } else {
            dbProduct = productRepository.save(data);
        }
        return dbProduct;
    }

    @Override
    public Product createOrUpdate(Product data) {
        validate(data);
        Product result = null;
        if (data.getProductId() != null) {
            result = productRepository.findById(data.getProductId()).orElse(null);
        } else if (StringUtils.isNotBlank(data.getName())) {
            result = productRepository.findByName(data.getName());
        }
        if (result != null) {
            result = save(data);
        } else {
            throw new IllegalArgumentException("Product with id " + data.getProductId() + " doesn't exists. Update can't be done");
        }
        return result;
    }

    @Override
    public Page<Product> getAll(PageInfo pageInfo) {
        long typeId = 0;
        try {
            typeId = Long.parseLong(pageInfo.getParam(PageInfo.TYPE_ID));
        } catch (NumberFormatException ex) {
            log.warn("Problem with parsing typeid", ex);
        }
        ProductType current = typeId != 0 ? productTypeRepository.findById(typeId).orElse(null) : null;
        String searchString = pageInfo.getParam(PageInfo.SEARCH_STRING);
        Page<Product> page;
        if (StringUtils.isBlank(searchString)) {
            if (current == null) {
                page = productRepository.findAll(PageRequest.of(pageInfo.getDbPageNumber(), pageInfo.getRecordsPerPage()));
            } else {
                page = productRepository.findAllByProductType(PageRequest.of(pageInfo.getDbPageNumber(), pageInfo.getRecordsPerPage()), current);
            }
        } else {
            if (current == null) {
                page = productRepository.findAllByNameIsContaining(PageRequest.of(pageInfo.getDbPageNumber(), pageInfo.getRecordsPerPage()), searchString);
            } else {
                page = productRepository.findAllByNameIsContainingAndProductType(PageRequest.of(pageInfo.getDbPageNumber(), pageInfo.getRecordsPerPage()), searchString, current);
            }
        }
        return page;
    }

    @Override
    public void delete(Product data) {
        validate(data);
        final Product dbProduct = productRepository.findById(data.getProductId()).orElse(null);
        if (dbProduct == null) {
            throw new IllegalArgumentException("Product with id " + data.getProductId() + " doesn't exists. Delete can't be done");
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
        return product != null && StringUtils.isNotBlank(product.getName()) && product.getEnergy() >= 0 && product.getProductType().getProdTypeId() != null;
    }

    @Transactional
    public Product save(Product productType){
        Product merge = em.merge(productType);
        em.clear();
        return merge;
    }
}

