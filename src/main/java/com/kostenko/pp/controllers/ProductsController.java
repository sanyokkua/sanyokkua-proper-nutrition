package com.kostenko.pp.controllers;

import com.kostenko.pp.data.entities.Product;
import com.kostenko.pp.data.repositories.food.ProductTypeRepository;
import com.kostenko.pp.json.entities.JsonProductEntity;
import com.kostenko.pp.services.DBService;
import com.kostenko.pp.services.page.PageInfo;
import com.kostenko.pp.services.page.ResultPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
public class ProductsController {
    private final ProductTypeRepository productTypeRepository;
    private final DBService<Product> productDBService;

    @Autowired
    public ProductsController(ProductTypeRepository productTypeRepository, @Qualifier("ProductDBService") DBService<Product> productDBService) {
        this.productDBService = Objects.requireNonNull(productDBService, "Instead of ProductDBService instance injected null");
        this.productTypeRepository = Objects.requireNonNull(productTypeRepository, "Instead of ProductTypeRepository instance injected null");
    }

    @GetMapping("/products")
    public ResultPage<JsonProductEntity> getAllProductsLike(@RequestParam(value = "name", required = false) String name,
                                                            @RequestParam(value = "page", required = false) Integer pageNumber,
                                                            @RequestParam(value = "currentType", required = false) Long currentType,
                                                            @RequestParam(value = "numberOfRecords", required = false) Integer numberOfRecords) {
        Map<String, String> params = new HashMap<>();
        params.put(PageInfo.SEARCH_STRING, name);
        params.put(PageInfo.TYPE_ID, String.valueOf(currentType));

        PageInfo pageInfo = PageInfo.createPageInfo(pageNumber, numberOfRecords, params);
        Page<Product> page = productDBService.getAll(pageInfo);

        return ResultPage.getResultPage(page, product -> JsonProductEntity.mapFromProduct(product, productTypeRepository));
    }

    @PostMapping("/products")
    @ResponseBody
    public Product createProduct(@RequestBody Product product) {
        return productDBService.create(product);
    }

    @PutMapping("/products/{id}")
    @ResponseBody
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        if (id.equals(product.getProductId())) {
            return productDBService.update(product);
        } else {
            throw new IllegalArgumentException("Id from path and in object are different");
        }
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity deleteProduct(@PathVariable Long id) {
        Product product = productDBService.findById(id);
        if (product == null) {
            throw new IllegalArgumentException("Product with id " + id + " doesn't exists. Delete can't be done");
        } else {
            productDBService.delete(product);
        }
        return ResponseEntity.ok("OK");
    }

}
