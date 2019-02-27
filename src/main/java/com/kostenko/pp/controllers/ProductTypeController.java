package com.kostenko.pp.controllers;

import com.kostenko.pp.data.services.ProductTypeCrudService;
import com.kostenko.pp.data.views.ProductType;
import com.kostenko.pp.json.entities.JsonProductTypeEntity;
import com.kostenko.pp.services.page.ResultPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
public class ProductTypeController {
    private final ProductTypeCrudService productTypeService;

    @Autowired
    public ProductTypeController(ProductTypeCrudService productTypeService) {
        this.productTypeService = Objects.requireNonNull(productTypeService, "Instead of ProductTypeCrudService instance injected null");
    }

    @GetMapping("/types")
    public ResultPage<JsonProductTypeEntity> getAllProductTypes() {
        PageImpl<ProductType> productTypes = new PageImpl<>(productTypeService.findAll());
        return ResultPage.getResultPage(productTypes, JsonProductTypeEntity::mapFromProductType);
    }

    @PostMapping("/types")
    @ResponseBody
    public ProductType createProductType(@RequestBody ProductType productType) {
        return productTypeService.create(productType);
    }

    @PutMapping("/types/{id}")
    @ResponseBody
    public ProductType updateProductType(@PathVariable Long id, @RequestBody ProductType productType) {
        if (id.equals(productType.getProdTypeId())) {
            if (productTypeService.isExists(productType)) {
                return productTypeService.update(productType);
            } else {
                return productTypeService.create(productType);
            }
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
            productTypeService.delete(id);
        }
        return ResponseEntity.ok("Ok");
    }
}
