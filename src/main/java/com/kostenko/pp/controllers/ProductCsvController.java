package com.kostenko.pp.controllers;

import com.kostenko.pp.data.entity.Product;
import com.kostenko.pp.data.entity.ProductType;
import com.kostenko.pp.data.repositories.food.GeneralRepository;
import com.kostenko.pp.data.repositories.food.ProductRepository;
import com.kostenko.pp.data.repositories.food.ProductTypeRepository;
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
    private final ProductRepository productRepository;
    private final ProductTypeRepository productTypeRepository;
    private final Map<String, Product> foundProducts;
    private final Map<String, ProductType> foundProductTypes;

    @Autowired
    public ProductCsvController(ProductRepository productRepository, ProductTypeRepository productTypeRepository) {
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
                ProductType productType = findProductType(type);
                if (productType == null) {
                    ProductType newProdType = new ProductType();
                    newProdType.setName(type);
                    productType = productTypeRepository.save(newProdType);
                }
                Product product = new Product();
                product.setName(name);
                product.setEnergy(energy);
                product.setTypeId(productType.getId());
                final Product exProduct = findProduct(product.getName());
                if (exProduct == null) {
                    productRepository.save(product);
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

    private ProductType findProductType(String name) {
        return find(name, foundProductTypes, productTypeRepository);
    }

    private Product findProduct(String name) {
        return find(name, foundProducts, productRepository);
    }

    private static <T> T find(String name, Map<String, T> map, GeneralRepository<T> repository) {
        T result = map.getOrDefault(name, null);
        if (result == null) {
            result = repository.findByName(name);
            if (result != null) {
                map.put(name, result);
            }
        }
        return result;
    }
}
