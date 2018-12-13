package com.kostenko.pp.data.repositories;

import com.kostenko.pp.data.entity.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {

    Product findByName(String name);

    List<Product> findAllByNameLike(String name);
}
