package com.kostenko.pp.data.repositories;

import com.kostenko.pp.data.entity.Dish;
import com.kostenko.pp.data.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DishRepository extends CrudRepository<Dish, Long> {

    Dish findByName(String name);

    Page<Dish> findAllByNameIsContaining(Pageable pageable, String name);

    Page<Dish> findAll(Pageable pageable);
}
