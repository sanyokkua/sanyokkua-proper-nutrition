package com.kostenko.pp.controllers;

import com.kostenko.pp.data.PageableSearch.SearchParams;
import com.kostenko.pp.data.services.ProductCrudService;
import com.kostenko.pp.data.views.Product;
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

    @Autowired
    public ProductsController(ProductCrudService productCrudService) {
        this.productCrudService = Objects.requireNonNull(productCrudService);
    }

    @GetMapping("/products")
    public ResultPage<JsonProductEntity> getAllProductsLike(@RequestParam(value = "name", required = false) String name,
                                                            @RequestParam(value = "page", required = false) Integer pageNumber,
                                                            @RequestParam(value = "currentType", required = false) Long currentType,
                                                            @RequestParam(value = "numberOfRecords", required = false) Integer numberOfRecords) {
        SearchParams<Product> searchParams = new SearchParams<>();
        searchParams.add(ProductCrudService.NAME, name, true);
        searchParams.add(ProductCrudService.TYPE, currentType, true);
        searchParams.add(ProductCrudService.RECORDS, numberOfRecords, true);
        searchParams.add(ProductCrudService.PAGE, pageNumber, true);
        Page<Product> page = productCrudService.findAll(searchParams);

        return ResultPage.getResultPage(page, product -> JsonProductEntity.mapFromProduct(com.kostenko.pp.data.views.Product.builder()
                                                                                                                            .productId(product.getProductId())
                                                                                                                            .name(product.getName())
                                                                                                                            .energy(product.getEnergy())
                                                                                                                            .prodTypeId(product.getProdTypeId())
                                                                                                                            .typeName(product.getTypeName())
                                                                                                                            .build()));
    }

    @PostMapping("/products")
    @ResponseBody
    public Product createProduct(@RequestBody Product product) {
        return productCrudService.create(product);
    }

    @PutMapping("/products/{id}")
    @ResponseBody
    public Product updateProduct(@PathVariable Long id, @RequestBody JsonProductEntity product) {
        if (id.equals(product.getProductId())) {
            return productCrudService.update(product.mapToProduct());
        } else {
            throw new IllegalArgumentException("Id from path and in object are different");
        }
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity deleteProduct(@PathVariable Long id) {
        Product product = productCrudService.findById(id);
        if (product == null) {
            throw new IllegalArgumentException("Product with id " + id + " doesn't exists. Delete can't be done");
        } else {
            productCrudService.delete(product.getProductId());
        }
        return ResponseEntity.ok("OK");
    }

}
