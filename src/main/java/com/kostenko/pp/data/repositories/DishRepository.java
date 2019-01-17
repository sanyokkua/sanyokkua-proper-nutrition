package com.kostenko.pp.data.repositories;

import com.kostenko.pp.data.entity.Dish;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DishRepository extends GeneralRepository<Dish>, CrudRepository<Dish, Long> {

    Page<Dish> findAllByNameIsContaining(Pageable pageable, String name);

}
