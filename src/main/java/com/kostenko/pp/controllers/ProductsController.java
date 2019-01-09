package com.kostenko.pp.controllers;

import com.google.common.base.Preconditions;
import com.google.common.collect.Lists;
import com.kostenko.pp.data.entity.Product;
import com.kostenko.pp.data.entity.ProductType;
import com.kostenko.pp.data.repositories.ProductRepository;
import com.kostenko.pp.data.repositories.ProductTypeRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class ProductsController {
    private static final int PAGE_SIZE = 10;
    private final ProductRepository productRepository;
    private final ProductTypeRepository productTypeRepository;

    @Autowired
    public ProductsController(ProductRepository productRepository, ProductTypeRepository productTypeRepository) {
        Preconditions.checkNotNull(productRepository);
        Preconditions.checkNotNull(productTypeRepository);
        this.productRepository = productRepository;
        this.productTypeRepository = productTypeRepository;
    }

    @GetMapping("/products")
    public ResultPage<Product> getAllProductsLike(@RequestParam(value = "name", required = false) String name, @RequestParam(value = "page", required = false) Integer pageNumber,
                                                  @RequestParam(value = "currentType", required = false) Long currentType) {
        final int currentPage = pageNumber == null ? 0 : pageNumber;
        final int normalizedPage = currentPage > 0 ? currentPage - 1 : currentPage;
        Page<Product> page;
        ProductType productType = null;
        if (currentType != null && currentType != 0) {
            final Optional<ProductType> type = productTypeRepository.findById(currentType);
            productType = type.orElse(null);
        }
        if (StringUtils.isBlank(name)) {
            if (productType == null) {
                page = productRepository.findAll(PageRequest.of(normalizedPage, PAGE_SIZE));
            } else {
                page = productRepository.findAllByTypeId(PageRequest.of(normalizedPage, PAGE_SIZE), productType.getId());
            }
        } else {
            if (productType == null) {
                page = productRepository.findAllByNameIsContaining(PageRequest.of(normalizedPage, PAGE_SIZE), name);
            } else {
                page = productRepository.findAllByNameIsContainingAndTypeId(PageRequest.of(normalizedPage, PAGE_SIZE), name, productType.getId());
            }
        }
        final int totalPagesFromDb = page.getTotalPages();
        final int totalPages = totalPagesFromDb;
        final List<Product> collect = page.stream().collect(Collectors.toList());
        return new ResultPage<>(currentPage, totalPages, collect);
    }

    @GetMapping("/types")
    public List<ProductType> getAllProductTypes() {
        ArrayList<ProductType> result = new ArrayList<>();
        result.add(new ProductType(0, "All"));
        final Iterable<ProductType> all = productTypeRepository.findAll();
        final ArrayList<ProductType> productTypes = Lists.newArrayList(all);
        result.addAll(productTypes);
        return result;
    }

    @PutMapping("/products")
    public Product createProduct(Product product) {
        final Product exProd = productRepository.findByName(product.getName());
        if (exProd == null) {
            product.setId(0);
            productRepository.save(product);
        }
        return exProd;
    }

}
