package com.kostenko.pp.controllers;

import com.kostenko.pp.data.entities.Product;
import com.kostenko.pp.data.entities.ProductType;
import com.kostenko.pp.data.repositories.food.ProductRepository;
import com.kostenko.pp.data.repositories.food.ProductTypeRepository;
import com.kostenko.pp.services.food.ProductTypeService;
import com.kostenko.pp.services.food.ProductsService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Controller
@Slf4j
public class ProductCsvController {
    private final ProductTypeService productTypeService;
    private final ProductsService productsService;
    private final ProductRepository productRepository;
    private final ProductTypeRepository productTypeRepository;
    private final Map<String, Product> foundProducts;
    private final Map<String, ProductType> foundProductTypes;

    @Autowired
    public ProductCsvController(ProductTypeService productTypeService, ProductsService productsService, ProductRepository productRepository, ProductTypeRepository productTypeRepository) {
        this.productTypeService = Objects.requireNonNull(productTypeService);
        this.productsService = Objects.requireNonNull(productsService);
        this.productRepository = Objects.requireNonNull(productRepository, "Instead of ProductRepository instance injected null");
        this.productTypeRepository = Objects.requireNonNull(productTypeRepository, "Instead of ProductTypeRepository instance injected null");
        foundProducts = new HashMap<>();
        foundProductTypes = new HashMap<>();
    }

    @PostMapping("/csv")
    public ResponseEntity importProducts(@RequestParam("csv") MultipartFile csvFile) {
        try (Reader in = new InputStreamReader(csvFile.getInputStream())) {
            log.info("File name={}, size={}", csvFile.getOriginalFilename(), csvFile.getSize());
            Iterable<CSVRecord> records = CSVFormat.DEFAULT.withDelimiter(';').withFirstRecordAsHeader().parse(in);
            for (CSVRecord record : records) {
                String type = record.get("type");
                String name = record.get("name");
                double energy = Double.valueOf(record.get("energy"));

                ProductType prodType = ProductType.builder().name(type).build();
                ProductType updatedProdType = productTypeService.createOrUpdate(prodType);
                Product product = Product.builder().name(name).energy(energy).productType(updatedProdType).build();
                product = productsService.createOrUpdate(product);
                if (product != null) {
                    updatedProdType.addProduct(product);
                    productTypeService.createOrUpdate(updatedProdType);
                }
            }
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } finally {
            foundProductTypes.clear();
            foundProducts.clear();
        }
        return ResponseEntity.ok("OK");
    }
}
