package com.kostenko.pp.controllers.food.products;

import com.kostenko.pp.controllers.extensions.RestCrudController;
import com.kostenko.pp.data.PageableSearch.SearchParams;
import com.kostenko.pp.data.pojos.Product;
import com.kostenko.pp.data.services.implementation.ProductService;
import com.kostenko.pp.presentation.ResultPage;
import com.kostenko.pp.presentation.json.pojos.JsonProduct;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Nonnull;
import java.util.Objects;

import static java.util.Objects.isNull;

@RestController
public class ProductsController implements RestCrudController<JsonProduct, ProductParams> {
    private final ProductService productService;

    @Autowired
    public ProductsController(ProductService productService) {
        this.productService = Objects.requireNonNull(productService);
    }

    @GetMapping("/products")
    @Override
    public ResultPage<JsonProduct> findAll(ProductParams params) {
        SearchParams<Product> searchParams = new SearchParams<>();
        searchParams.add(ProductService.NAME, params.getSearchString(), true)
                    .add(ProductService.TYPE, params.getCurrentType(), true)
                    .add(ProductService.RECORDS, params.getRecordsPerPage(), true)
                    .add(ProductService.PAGE, params.getPage(), true);
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
    @Override
    public JsonProduct create(@Nonnull @NonNull JsonProduct jsonEntity) {
        Product product = jsonEntity.mapToProduct();
        Product created = productService.create(product);
        return Objects.isNull(created) ? null : JsonProduct.mapFromProduct(created);
    }

    @PutMapping("/products/{id}")
    @ResponseBody
    @Override
    public JsonProduct update(@PathVariable @Nonnull @NonNull Long id, JsonProduct jsonEntity) {
        Product product = jsonEntity.mapToProduct();
        if (id.equals(product.getProductId())) {
            Product updated = productService.update(product);
            return Objects.isNull(updated) ? null : JsonProduct.mapFromProduct(updated);
        } else {
            throw new IllegalArgumentException("Id from path and in object are different");
        }
    }

    @DeleteMapping("/products/{id}")
    @Override
    public ResponseEntity delete(@PathVariable @Nonnull @NonNull Long id) {
        Product product = productService.findById(id);
        if (isNull(product)) {
            throw new IllegalArgumentException("Product with id " + id + " doesn't exists. Delete can't be done");
        } else {
            productService.delete(product.getProductId());
        }
        return ResponseEntity.ok("OK");
    }
}
