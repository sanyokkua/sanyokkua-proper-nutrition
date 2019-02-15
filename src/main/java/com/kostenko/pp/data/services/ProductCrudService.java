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

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.Objects;

@Service
@Slf4j
public class ProductCrudService {
    private final ProductJpaRepository productJpaRepository;
    private final ProductTypeJpaRepository productTypeJpaRepository;
    private final ProductTypeCrudService productTypeCrudService;

    @PersistenceContext
    private EntityManager entityManager;

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

    @Transactional
    protected Product create(Product product) {
        Product fromDb = null;
        ProductType productType = product.getProductType();
        ProductType productTypeFromDb;
        if (!productTypeJpaRepository.existsByName(productType.getName())) {
            productTypeFromDb = productTypeCrudService.createOrUpdateProductType(productType);
        } else {
            productTypeFromDb = productTypeCrudService.getProductTypeByName(productType.getName());
        }
        //long id = ((Number) entityManager.createNativeQuery("select prodIdSequence.nextval from prod_id_sequence").getSingleResult()).longValue();
        //Query nativeQuery = entityManager.createNativeQuery("insert into product (energy, name, prod_type_id, product_id) values (:energy,:name,:prod_type_id, prod_id_sequence.nextval)");
        //nativeQuery.setParameter("energy", product.getEnergy());
        //nativeQuery.setParameter("name", product.getName());
        //nativeQuery.setParameter("prod_type_id", productTypeFromDb.getProdTypeId());
//        nativeQuery.setParameter("id", id);
        //nativeQuery.executeUpdate();
        product.setProductType(productTypeFromDb);
//        EntityTransaction transaction = entityManager.getTransaction();
//        transaction.begin();
//        transaction.commit();
        //productTypeFromDb.addProduct(product);
        //productTypeJpaRepository.save(productTypeFromDb);
        fromDb = productJpaRepository.findByName(product.getName());
        return fromDb;
    }

    private Product update(Product product) {
        Product fromDb = productJpaRepository.getOne(product.getProductId());
        fromDb.setProductType(product.getProductType());
        fromDb.setAmount(product.getAmount());
        fromDb.setEnergy(product.getEnergy());
        fromDb.setName(product.getName());
        return productJpaRepository.save(fromDb);
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
