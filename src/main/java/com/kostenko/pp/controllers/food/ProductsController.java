package com.kostenko.pp.controllers.food;

import com.kostenko.pp.data.PageableSearch.SearchParams;
import com.kostenko.pp.data.pojos.Product;
import com.kostenko.pp.data.services.implementation.ProductService;
import com.kostenko.pp.presentation.ResultPage;
import com.kostenko.pp.presentation.json.pojos.JsonProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

import static java.util.Objects.isNull;

@RestController
public class ProductsController {
    private final ProductService productService;

    @Autowired
    public ProductsController(ProductService productService) {
        this.productService = Objects.requireNonNull(productService);
    }

    @GetMapping("/products")
    public ResultPage<JsonProduct> getAllProductsLike(@RequestParam(value = "name", required = false) String name,
                                                      @RequestParam(value = "page", required = false) Integer pageNumber,
                                                      @RequestParam(value = "currentType", required = false) Long currentType,
                                                      @RequestParam(value = "numberOfRecords", required = false) Integer numberOfRecords) {
        SearchParams<Product> searchParams = new SearchParams<>();
        searchParams.add(ProductService.NAME, name, true);
        searchParams.add(ProductService.TYPE, currentType, true);
        searchParams.add(ProductService.RECORDS, numberOfRecords, true);
        searchParams.add(ProductService.PAGE, pageNumber, true);
        Page<Product> page = productService.findAll(searchParams);
        return ResultPage.getResultPage(page, product -> JsonProduct.mapFromProduct(Product.builder()
                                                                                           .productId(product.getProductId())
                                                                                           .productName(product.getProductName())
                                                                                           .productEnergy(product.getProductEnergy())
                                                                                           .prodTypeId(product.getProdTypeId())
                                                                                           .prodTypeName(product.getProdTypeName())
                                                                                           .build()));
    }

    @PostMapping("/products")
    @ResponseBody
    public Product createProduct(@RequestBody Product product) {
        return productService.create(product);
    }

    @PutMapping("/products/{id}")
    @ResponseBody
    public Product updateProduct(@PathVariable Long id, @RequestBody JsonProduct product) {
        if (id.equals(product.getProductId())) {
            return productService.update(product.mapToProduct());
        } else {
            throw new IllegalArgumentException("Id from path and in object are different");
        }
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity deleteProduct(@PathVariable Long id) {
        Product product = productService.findById(id);
        if (isNull(product)) {
            throw new IllegalArgumentException("Product with id " + id + " doesn't exists. Delete can't be done");
        } else {
            productService.delete(product.getProductId());
        }
        return ResponseEntity.ok("OK");
    }

}
