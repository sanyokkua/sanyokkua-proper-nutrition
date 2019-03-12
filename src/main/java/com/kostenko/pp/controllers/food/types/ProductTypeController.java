package com.kostenko.pp.controllers.food.types;

import com.kostenko.pp.controllers.extensions.RestCrudController;
import com.kostenko.pp.data.pojos.ProductType;
import com.kostenko.pp.data.services.implementation.ProductTypeService;
import com.kostenko.pp.presentation.ResultPage;
import com.kostenko.pp.presentation.json.pojos.JsonProductType;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Nonnull;
import java.util.Objects;

import static java.util.Objects.isNull;

@RestController
public class ProductTypeController implements RestCrudController<JsonProductType, ProductTypeParams> {
    private final ProductTypeService productTypeService;

    @Autowired
    public ProductTypeController(ProductTypeService productTypeService) {
        this.productTypeService = Objects.requireNonNull(productTypeService, "Instead of ProductTypeCrudService instance injected null");
    }

    @GetMapping("/types")
    @Override
    public ResultPage<JsonProductType> findAll(ProductTypeParams params) {
        PageImpl<ProductType> productTypes = new PageImpl<>(productTypeService.findAll());
        return ResultPage.getResultPage(productTypes, JsonProductType::mapFromProductType);
    }

    @PostMapping("/types")
    @ResponseBody
    @Override
    public JsonProductType create(@Nonnull @NonNull JsonProductType jsonEntity) {
        ProductType productType = jsonEntity.mapToProductType();
        ProductType created = productTypeService.create(productType);
        return Objects.isNull(created) ? null : JsonProductType.mapFromProductType(created);
    }

    @PutMapping("/types/{id}")
    @ResponseBody
    @Override
    public JsonProductType update(@PathVariable @Nonnull @NonNull Long id, JsonProductType jsonEntity) {
        ProductType productType = jsonEntity.mapToProductType();
        if (id.equals(productType.getProdTypeId())) {
            if (productTypeService.isExists(productType)) {
                ProductType updated = productTypeService.update(productType);
                return Objects.isNull(updated) ? null : JsonProductType.mapFromProductType(updated);
            } else {
                ProductType created = productTypeService.create(productType);
                return Objects.isNull(created) ? null : JsonProductType.mapFromProductType(created);
            }
        } else {
            throw new IllegalArgumentException("Id from path and in object are different");
        }
    }

    @DeleteMapping("/types/{id}")
    @Override
    public ResponseEntity delete(@PathVariable @Nonnull @NonNull Long id) {
        ProductType byId = productTypeService.findById(id);
        if (isNull(byId)) {
            throw new IllegalArgumentException("ProductType with id " + id + " doesn't exists. Delete can't be done");
        } else {
            productTypeService.delete(id);
        }
        return ResponseEntity.ok("Ok");
    }
}
