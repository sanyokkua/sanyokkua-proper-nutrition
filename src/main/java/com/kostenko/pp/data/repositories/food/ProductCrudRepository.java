package com.kostenko.pp.data.repositories.food;

import com.kostenko.pp.data.entities.Product;
import com.kostenko.pp.data.entities.ProductType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductCrudRepository extends GeneralRepository<Product>, CrudRepository<Product, Long> {

    Product findByNameAndProductType(String name, ProductType typeID);

    List<Product> findAllByNameIsStartingWith(String name);

    Page<Product> findAllByNameIsContaining(Pageable pageable, String name);

    Page<Product> findAllByProductType(Pageable pageable, ProductType typeId);

    long countAllByProductType(ProductType typeId);

    Page<Product> findAllByNameIsContainingAndProductType(Pageable pageable, String name, ProductType typeId);

}
