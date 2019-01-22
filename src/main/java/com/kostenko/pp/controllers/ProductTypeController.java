package com.kostenko.pp.controllers;

import com.kostenko.pp.data.entity.ProductType;
import com.kostenko.pp.json.JsonProductType;
import com.kostenko.pp.services.food.ProductTypeService;
import com.kostenko.pp.services.page.PageInfo;
import com.kostenko.pp.services.page.ResultPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
public class ProductTypeController {
    private final ProductTypeService productTypeService;

    @Autowired
    public ProductTypeController(ProductTypeService productTypeService) {
        this.productTypeService = Objects.requireNonNull(productTypeService, "Instead of ProductTypeService instance injected null");
    }

    @GetMapping("/types")
    public ResultPage<JsonProductType> getAllProductTypes() {
        PageInfo pageInfo = PageInfo.createPageInfo();
        Page<ProductType> page = productTypeService.getAll(pageInfo);
        return ResultPage.getResultPage(page, JsonProductType::mapFromProductType);
    }

    @PostMapping("/types")
    @ResponseBody
    public ProductType createProductType(@RequestBody ProductType productType) {
        return productTypeService.create(productType);
    }

    @PutMapping("/types/{id}")
    @ResponseBody
    public ProductType updateProductType(@PathVariable Long id, @RequestBody ProductType productType) {
        if (id.equals(productType.getId())) {
            return productTypeService.update(productType);
        } else {
            throw new IllegalArgumentException("Id from path and in object are different");
        }
    }

    @DeleteMapping("/types/{id}")
    public ResponseEntity deleteProductType(@PathVariable Long id) {
        ProductType byId = productTypeService.findById(id);
        if (byId == null) {
            throw new IllegalArgumentException("ProductType with id " + id + " doesn't exists. Delete can't be done");
        } else {
            productTypeService.delete(byId);
        }
        return ResponseEntity.ok("Ok");
    }
}
