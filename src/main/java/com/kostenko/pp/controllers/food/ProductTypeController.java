package com.kostenko.pp.controllers.food;

import com.kostenko.pp.data.pojos.ProductType;
import com.kostenko.pp.data.services.implementation.ProductTypeService;
import com.kostenko.pp.presentation.ResultPage;
import com.kostenko.pp.presentation.json.pojos.JsonProductType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

import static java.util.Objects.isNull;

@RestController
public class ProductTypeController {
    private final ProductTypeService productTypeService;

    @Autowired
    public ProductTypeController(ProductTypeService productTypeService) {
        this.productTypeService = Objects.requireNonNull(productTypeService, "Instead of ProductTypeCrudService instance injected null");
    }

    @GetMapping("/types")
    public ResultPage<JsonProductType> getAllProductTypes() {
        PageImpl<ProductType> productTypes = new PageImpl<>(productTypeService.findAll());
        return ResultPage.getResultPage(productTypes, JsonProductType::mapFromProductType);
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
        if (isNull(byId)) {
            throw new IllegalArgumentException("ProductType with id " + id + " doesn't exists. Delete can't be done");
        } else {
            productTypeService.delete(id);
        }
        return ResponseEntity.ok("Ok");
    }
}
