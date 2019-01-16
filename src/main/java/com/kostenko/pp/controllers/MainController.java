package com.kostenko.pp.controllers;

import com.google.common.base.Preconditions;
import com.kostenko.pp.data.entity.Product;
import com.kostenko.pp.data.entity.ProductType;
import com.kostenko.pp.data.repositories.ProductRepository;
import com.kostenko.pp.data.repositories.ProductTypeRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;

@Controller
@Slf4j
public class MainController {
    private final ProductRepository productRepository;
    private final ProductTypeRepository productTypeRepository;

    @Autowired
    public MainController(ProductRepository productRepository, ProductTypeRepository productTypeRepository) {
        Preconditions.checkNotNull(productRepository);
        Preconditions.checkNotNull(productTypeRepository);
        this.productRepository = productRepository;
        this.productTypeRepository = productTypeRepository;
    }

    @SuppressWarnings("SameReturnValue")
    @RequestMapping(value = "/")
    public String index() {
        return "index";
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
                ProductType productType = productTypeRepository.findByName(type);
                if (productType == null) {
                    ProductType newProdType = new ProductType();
                    newProdType.setName(type);
                    productType = productTypeRepository.save(newProdType);
                }
                Product product = new Product();
                product.setName(name);
                product.setEnergy(energy);
                product.setTypeId(productType.getId());
                final Product exProduct = productRepository.findByName(product.getName());
                if (exProduct == null) {
                    productRepository.save(product);
                }
            }
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok("OK");
    }

}
