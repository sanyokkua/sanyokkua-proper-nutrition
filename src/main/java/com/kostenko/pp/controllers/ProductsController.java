package com.kostenko.pp.controllers;

import com.kostenko.pp.data.RequestInfo;
import com.kostenko.pp.data.entities.Product;
import com.kostenko.pp.data.entities.ProductType;
import com.kostenko.pp.data.repositories.food.ProductTypeCrudRepository;
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
    private final ProductTypeCrudRepository productTypeCrudRepository;

    @Autowired
    public ProductsController(ProductCrudService productCrudService, ProductTypeCrudRepository productTypeCrudRepository) {
        this.productCrudService = Objects.requireNonNull(productCrudService);
        this.productTypeCrudRepository = Objects.requireNonNull(productTypeCrudRepository, "Instead of ProductTypeRepository instance injected null");
    }

    @GetMapping("/products")
    public ResultPage<JsonProductEntity> getAllProductsLike(@RequestParam(value = "name", required = false) String name,
                                                            @RequestParam(value = "page", required = false) Integer pageNumber,
                                                            @RequestParam(value = "currentType", required = false) Long currentType,
                                                            @RequestParam(value = "numberOfRecords", required = false) Integer numberOfRecords) {
        ProductType productType = null;
        try {
            productType = productTypeCrudRepository.findById(currentType).orElse(null);
        } catch (Exception ex) {
            productType = null;
        }
        RequestInfo requestInfo = RequestInfo.builder().search(name).uiPageNumber(pageNumber).productType(productType).recordsPerPage(numberOfRecords).build();
        Page<Product> page = productCrudService.getAll(requestInfo);
        return ResultPage.getResultPage(page, product -> JsonProductEntity.mapFromProduct(com.kostenko.pp.data.views.Product.builder()
                                                                                                                            .productId(product.getProductId())
                                                                                                                            .name(product.getName())
                                                                                                                            .energy(product.getEnergy())
                                                                                                                            .prodTypeId(product.getProductType().getProdTypeId())
                                                                                                                            .typeName(product.getProductType().getName())
                                                                                                                            .build()));
    }

    @PostMapping("/products")
    @ResponseBody
    public Product createProduct(@RequestBody Product product) {
        return productCrudService.createOrUpdateProduct(product);
    }

    @PutMapping("/products/{id}")
    @ResponseBody
    public Product updateProduct(@PathVariable Long id, @RequestBody JsonProductEntity product) {
        if (id.equals(product.getProductId())) {
            return productCrudService.createOrUpdateProduct(product.mapToProduct().map());
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
