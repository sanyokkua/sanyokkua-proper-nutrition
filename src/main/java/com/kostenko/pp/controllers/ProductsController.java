package com.kostenko.pp.controllers;

import com.kostenko.pp.data.entity.Product;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
public class ProductsController {
    private Collection<Product> allProducts = new HashSet<>();

    @GetMapping("/products")
    public List<Product> getAllProductsLike(@RequestParam(value = "name", required = false) String name) {
        Product[] products = new Product[]{new Product(1111, "Apple", 100), new Product(1, "Cheeze", 100), new Product(2, "Pineapple", 21), new Product(3, "Toast", 10), new Product(4, "Strawberry", 108),
                                           new Product(5, "Potato", 122), new Product(6, "Orange", 131), new Product(7, "Bread", 123), new Product(8, "Mango", 167), new Product(9, "Cake", 500), new Product(10, "Cactus", 122),
                                           new Product(11, "Berry", 111), new Product(12, "Cola", 107),};
        allProducts.addAll(Stream.of(products).collect(Collectors.toList()));
        final List<Product> result = new ArrayList<>();
        if (StringUtils.isNotBlank(name)) {
            result.addAll(allProducts.stream().filter(product -> product.getName().startsWith(name)).collect(Collectors.toList()));
        } else {
            result.addAll(new ArrayList<>(allProducts));
        }
        return result;
    }

    @PutMapping("/products")
    public Product createProduct(Product product) {
        allProducts.add(product);
        return product;
    }

}
