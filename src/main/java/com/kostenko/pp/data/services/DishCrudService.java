package com.kostenko.pp.data.services;

import com.kostenko.pp.data.repositories.jdbc.DishRepository;
import com.kostenko.pp.data.views.Dish;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Nonnull;
import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Slf4j
public class DishCrudService {
    private final DishRepository dishRepository;

    @Autowired
    public DishCrudService(DishRepository dishRepository) {
        this.dishRepository = Objects.requireNonNull(dishRepository);
    }

    public Dish getById(@NonNull @Nonnull Long id) {
        Optional<Dish> dish = dishRepository.findById(id);
        return dish.orElse(null);
    }

    public Dish getByName(@NotBlank String name) {
        Optional<Dish> dish = dishRepository.findByUniqueField(name);
        return dish.orElse(null);
    }

    public Dish create(@NonNull @Nonnull Dish dish) {
        Optional<Dish> created = dishRepository.create(dish);
        return created.orElse(null);
    }

    public Dish update(@NonNull @Nonnull Dish dish) {
        Optional<Dish> updated = dishRepository.update(dish);
        return updated.orElse(null);
    }

    public void delete(@NonNull @Nonnull Long id) {
        dishRepository.deleteById(id);
    }

    public List<Dish> getAll() {
        return dishRepository.findAll();
    }
}
