package com.kostenko.pp.controllers;

import com.google.common.base.Preconditions;
import com.google.common.collect.Lists;
import com.kostenko.pp.data.ProductUIView;
import com.kostenko.pp.data.entity.Product;
import com.kostenko.pp.data.entity.ProductType;
import com.kostenko.pp.data.repositories.ProductRepository;
import com.kostenko.pp.data.repositories.ProductTypeRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResultPage<ProductUIView> getAllProductsLike(@RequestParam(value = "name", required = false) String name,
                                                        @RequestParam(value = "page", required = false) Integer pageNumber,
                                                        @RequestParam(value = "currentType", required = false) Long currentType,
                                                        @RequestParam(value = "numberOfRecords", required = false) Integer numberOfRecords) {
        final int currentPage = pageNumber == null ? 0 : pageNumber;
        final int normalizedPage = currentPage > 0 ? currentPage - 1 : currentPage;
        Page<Product> page;
        ProductType productType = null;
        if (currentType != null && currentType != 0) {
            final Optional<ProductType> type = productTypeRepository.findById(currentType);
            productType = type.orElse(null);
        }
        int pageSize = numberOfRecords != null && numberOfRecords > 0 ? numberOfRecords : PAGE_SIZE;
        if (StringUtils.isBlank(name)) {
            if (productType == null) {
                page = productRepository.findAll(PageRequest.of(normalizedPage, pageSize));
            } else {
                page = productRepository.findAllByTypeId(PageRequest.of(normalizedPage, pageSize), productType.getId());
            }
        } else {
            if (productType == null) {
                page = productRepository.findAllByNameIsContaining(PageRequest.of(normalizedPage, pageSize), name);
            } else {
                page = productRepository.findAllByNameIsContainingAndTypeId(PageRequest.of(normalizedPage, pageSize), name, productType.getId());
            }
        }
        final int totalPagesFromDb = page.getTotalPages();
        final int totalPages = totalPagesFromDb;
        final List<ProductUIView> collect = page.stream()
                                                .map(product -> new ProductUIView(product.getId(), product.getName(), product.getEnergy(), product.getTypeId(), productTypeRepository.findById(product.getTypeId()).orElse(new ProductType()).getName()))
                                                .collect(Collectors.toList());
        return new ResultPage<>(currentPage, totalPages, collect);
    }



    @PostMapping("/products")
    @ResponseBody
    public Product createProduct(@RequestBody Product product) {
        final Product exProd = productRepository.findByNameAndTypeId(product.getName(), product.getTypeId());
        if (exProd == null) {
            productRepository.save(product);
        }
        return exProd;
    }

    @PutMapping("/products/{id}")
    @ResponseBody
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        Product exProd = productRepository.findById(id).orElse(null);
        if (exProd == null) {
            throw new IllegalArgumentException("Product with id " + product.getId() + " doesn't exists. Update can't be done");
        } else {
            exProd = productRepository.save(product);
        }
        return exProd;
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity deleteProduct(@PathVariable Long id) {
        final Product exProd = productRepository.findById(id).orElse(null);
        if (exProd == null) {
            throw new IllegalArgumentException("Product with id " + id + " doesn't exists. Delete can't be done");
        } else {
            productRepository.delete(exProd);
        }
        return ResponseEntity.ok(exProd);
    }

}
