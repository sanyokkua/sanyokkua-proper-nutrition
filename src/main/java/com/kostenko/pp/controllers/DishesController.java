package com.kostenko.pp.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Preconditions;
import com.kostenko.pp.data.DishProduct;
import com.kostenko.pp.data.DishUIView;
import com.kostenko.pp.data.entity.Dish;
import com.kostenko.pp.data.repositories.DishRepository;
import com.kostenko.pp.data.repositories.ProductRepository;
import com.kostenko.pp.data.repositories.ProductTypeRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@RestController
@Slf4j
public class DishesController {
    private static final int PAGE_SIZE = 10;
    private final ProductRepository productRepository;
    private final ProductTypeRepository productTypeRepository;
    private final DishRepository dishRepository;

    @Autowired
    public DishesController(ProductRepository productRepository, ProductTypeRepository productTypeRepository, DishRepository dishRepository) {
        Preconditions.checkNotNull(productRepository);
        Preconditions.checkNotNull(productTypeRepository);
        Preconditions.checkNotNull(dishRepository);
        this.dishRepository = dishRepository;
        this.productRepository = productRepository;
        this.productTypeRepository = productTypeRepository;
    }

    @GetMapping("/dishes")
    public ResultPage<DishUIView> getAllProductsLike(@RequestParam(value = "name", required = false) String name,
                                                     @RequestParam(value = "page", required = false) Integer pageNumber,
                                                     @RequestParam(value = "numberOfRecords", required = false) Integer numberOfRecords) {
        final int currentPage = pageNumber == null ? 0 : pageNumber;
        final int normalizedPage = currentPage > 0 ? currentPage - 1 : currentPage;
        Page<Dish> page;
        int pageSize = numberOfRecords != null && numberOfRecords > 0 ? numberOfRecords : PAGE_SIZE;
        if (StringUtils.isBlank(name)) {
            page = dishRepository.findAll(PageRequest.of(normalizedPage, pageSize));
        } else {
            page = dishRepository.findAllByNameIsContaining(PageRequest.of(normalizedPage, pageSize), name);
        }
        final int totalPagesFromDb = page.getTotalPages();
        final List<DishUIView> collect = page.stream()
                                             .map(dish -> {
                                                 List<DishProduct> result = null;
                                                 try {
                                                     result = new ObjectMapper().readValue(dish.getProducts(), new TypeReference<List<DishProduct>>(){});
                                                 } catch (IOException e) {
                                                     log.error(e.getMessage(), e);
                                                 }
                                                 int totalEnergy = 0;
                                                 for (DishProduct product : result){
                                                     totalEnergy+=product.getEnergy();
                                                 }
                                                 return new DishUIView(dish.getId(), dish.getName(), result, totalEnergy);
                                             })
                                             .collect(Collectors.toList());
        return new ResultPage<>(currentPage, totalPagesFromDb, collect);
    }

    @PostMapping("/dishes")
    @ResponseBody
    public Dish createProduct(@RequestBody Dish dish) {
        final Dish dishFromDb = dishRepository.findByName(dish.getName());
        if (dishFromDb == null) {
            dishRepository.save(dish);
        }
        return dishFromDb;
    }

    @PutMapping("/dishes/{id}")
    @ResponseBody
    public Dish updateProduct(@PathVariable Long id, @RequestBody Map<String, String> dish) throws JsonProcessingException {
        Dish dishFromDb = dishRepository.findById(id).orElse(null);
        if (dishFromDb == null) {
            throw new IllegalArgumentException("Dish with id " + dish.get("id") + " doesn't exists. Update can't be done");
        } else {
//            final String products = new ObjectMapper().writeValueAsString(dish.getProducts()); //TODO:
//            Dish toSave = new Dish(dish.getId(), dish.getName(), products);
//            dishFromDb = dishRepository.save(toSave);
        }
        return dishFromDb;
    }

    @DeleteMapping("/dishes/{id}")
    public ResponseEntity deleteProduct(@PathVariable Long id) {
        final Dish dishFromDb = dishRepository.findById(id).orElse(null);
        if (dishFromDb == null) {
            throw new IllegalArgumentException("Dish with id " + id + " doesn't exists. Delete can't be done");
        } else {
            dishRepository.delete(dishFromDb);
        }
        return ResponseEntity.ok(dishFromDb);
    }
}
