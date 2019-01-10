package com.kostenko.pp.controllers;

import com.google.common.base.Preconditions;
import com.google.common.collect.Lists;
import com.kostenko.pp.data.entity.ProductType;
import com.kostenko.pp.data.repositories.ProductRepository;
import com.kostenko.pp.data.repositories.ProductTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductTypeController {
    private final ProductTypeRepository productTypeRepository;
    private final ProductRepository productRepository;

    @Autowired
    public ProductTypeController(ProductTypeRepository productTypeRepository, ProductRepository productRepository) {
        Preconditions.checkNotNull(productTypeRepository);
        Preconditions.checkNotNull(productRepository);
        this.productRepository = productRepository;
        this.productTypeRepository = productTypeRepository;
    }

    @GetMapping("/types")
    public List<ProductType> getAllProductTypes() {
        Iterable<ProductType> all = productTypeRepository.findAll();
        return Lists.newArrayList(all);
    }

    @PostMapping("/types")
    @ResponseBody
    public ProductType createProductType(@RequestBody ProductType productType) {
        final ProductType exProd = productTypeRepository.findByName(productType.getName());
        if (exProd == null) {
            productTypeRepository.save(productType);
        } else {
            throw new IllegalArgumentException("Type already exists");
        }
        return exProd;
    }

    @PutMapping("/types/{id}")
    @ResponseBody
    public ProductType updateProductType(@PathVariable Long id, @RequestBody ProductType productType) {
        ProductType exProd = productTypeRepository.findById(id).orElse(null);
        if (exProd == null) {
            throw new IllegalArgumentException("ProductType with id " + productType.getId() + " doesn't exists. Update can't be done");
        } else {
            exProd = productTypeRepository.save(productType);
        }
        return exProd;
    }

    @DeleteMapping("/types/{id}")
    public ResponseEntity deleteProductType(@PathVariable Long id) {
        final ProductType exProd = productTypeRepository.findById(id).orElse(null);
        if (exProd == null) {
            throw new IllegalArgumentException("ProductType with id " + id + " doesn't exists. Delete can't be done");
        } else {
            long numberOfRecordsWithType = productRepository.countAllByTypeId(id);
            if (numberOfRecordsWithType < 1) {
                productTypeRepository.delete(exProd);
            } else {
                throw new IllegalArgumentException("Type can't be deleted till it in use");
            }
        }
        return ResponseEntity.ok(exProd);
    }
}
