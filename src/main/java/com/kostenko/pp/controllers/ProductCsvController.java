package com.kostenko.pp.controllers;

import com.kostenko.pp.data.services.ProductCrudService;
import com.kostenko.pp.data.views.Product;
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
import java.util.Objects;

@Controller
@Slf4j
public class ProductCsvController {
    private final ProductCrudService productsService;

    @Autowired
    public ProductCsvController(ProductCrudService productsService) {
        this.productsService = Objects.requireNonNull(productsService);
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
                Product product = Product.builder().name(name).energy(energy).typeName(type).build();
                productsService.create(product);
            }
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok("OK");
    }
}
