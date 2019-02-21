package com.kostenko.pp.data.repositories.food;

import com.kostenko.pp.data.entities.Dish;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DishJpaRepository extends GeneralRepository<Dish>, CrudRepository<Dish, Long> {

    Page<Dish> findAllByNameIsContaining(Pageable pageable, String name);

}
