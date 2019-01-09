package com.kostenko.pp.services;

import com.google.common.base.Preconditions;
import com.kostenko.pp.data.entity.Product;
import com.kostenko.pp.data.repositories.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class ProductsService {
    private final ProductRepository productRepository;

    public ProductsService(ProductRepository productRepository) {
        Preconditions.checkNotNull(productRepository, "Null injected instead of " + ProductRepository.class.getName());
        this.productRepository = productRepository;
    }

    public void createProduct(Product product) {
        if (!isValid(product)) {
            throw new IllegalArgumentException("Product has invalid fields: " + product.toString());
        }
        productRepository.save(product);
    }

    private boolean isValid(Product product) {
        Preconditions.checkNotNull(product, "Product is null");
        return product.getEnergy() >= 0 && StringUtils.isNotBlank(product.getName());
    }

    public void updateProduct(Product product) {
        if (!isValid(product)) {
            throw new IllegalArgumentException("Product has invalid fields: " + product.toString());
        }
        final Product byName = productRepository.findByName(product.getName());
        product.setId(byName.getId());
        productRepository.save(product);
    }

    public Product searchProduct(String name) {
        if (StringUtils.isBlank(name)) {
            log.warn("Product name is blank");
            throw new IllegalArgumentException("Product name is blank");
        }
        log.info("searchProduct. Looking for product: {}", name);
        return productRepository.findByName(name);
    }

    public List<Product> searchProductsLike(String name) {
        if (StringUtils.isBlank(name)) {
            log.warn("Product name is blank");
            throw new IllegalArgumentException("Product name is blank");
        }
        log.info("searchProduct. Looking for product: {}", name);
        return productRepository.findAllByNameIsStartingWith(name);
    }

    public List<Product> getAllProducts() {
        List<Product> products = new ArrayList<>();
        productRepository.findAll().forEach(products::add);
        return products;
    }
}
