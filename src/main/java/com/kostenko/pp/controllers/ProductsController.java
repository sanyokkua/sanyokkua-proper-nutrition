package com.kostenko.pp.controllers;

import com.kostenko.pp.data.RequestInfo;
import com.kostenko.pp.data.entities.Product;
import com.kostenko.pp.data.entities.ProductType;
import com.kostenko.pp.data.repositories.food.ProductTypeRepository;
import com.kostenko.pp.data.services.ProductCrudService;
import com.kostenko.pp.json.entities.JsonProductEntity;
import com.kostenko.pp.services.page.ResultPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
public class ProductsController {
    private final ProductCrudService productCrudService;
    private final ProductTypeRepository productTypeRepository;

    @Autowired
    public ProductsController(ProductCrudService productCrudService, ProductTypeRepository productTypeRepository) {
        this.productCrudService = Objects.requireNonNull(productCrudService);
        this.productTypeRepository = Objects.requireNonNull(productTypeRepository, "Instead of ProductTypeRepository instance injected null");
    }

    @GetMapping("/products")
    public ResultPage<JsonProductEntity> getAllProductsLike(@RequestParam(value = "name", required = false) String name,
                                                            @RequestParam(value = "page", required = false) Integer pageNumber,
                                                            @RequestParam(value = "currentType", required = false) Long currentType,
                                                            @RequestParam(value = "numberOfRecords", required = false) Integer numberOfRecords) {
        ProductType productType = null;
        try {
            productType = productTypeRepository.findById(currentType).orElse(null);
        } catch (Exception ex) {
            productType = null;
        }
        RequestInfo requestInfo = RequestInfo.builder().search(name).uiPageNumber(pageNumber).productType(productType).recordsPerPage(numberOfRecords).build();
        Page<Product> page = productCrudService.getAll(requestInfo);
        return ResultPage.getResultPage(page, product -> JsonProductEntity.mapFromProduct(product, productTypeRepository));
    }

    @PostMapping("/products")
    @ResponseBody
    public Product createProduct(@RequestBody Product product) {
        return productCrudService.createOrUpdateProduct(product);
    }

    @PutMapping("/products/{id}")
    @ResponseBody
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        if (id.equals(product.getProductId())) {
            return productCrudService.createOrUpdateProduct(product);
        } else {
            throw new IllegalArgumentException("Id from path and in object are different");
        }
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity deleteProduct(@PathVariable Long id) {
        Product product = productCrudService.getProductById(id);
        if (product == null) {
            throw new IllegalArgumentException("Product with id " + id + " doesn't exists. Delete can't be done");
        } else {
            productCrudService.deleteProduct(product);
        }
        return ResponseEntity.ok("OK");
    }

}
