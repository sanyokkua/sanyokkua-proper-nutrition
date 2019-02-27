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

@Slf4j
@Service
public class DishCrudService implements DBService<Dish> {
    private final DishRepository dishRepository;

    @Autowired
    public DishCrudService(DishRepository dishRepository) {
        this.dishRepository = Objects.requireNonNull(dishRepository);
    }

    @Override
    public Dish findById(@Nonnull @NonNull Long id) {
        return dishRepository.find(id);
    }

    @Override
    public Dish findByField(@Nonnull @NonNull @NotBlank String field) {
        return dishRepository.findByField(field);
    }

    @Override
    public Dish create(@NonNull @Nonnull Dish dish) {
        return dishRepository.create(dish);
    }

    @Override
    public Dish update(@NonNull @Nonnull Dish dish) {
        return dishRepository.update(dish);
    }

    @Override
    public void delete(@NonNull @Nonnull Long id) {
        dishRepository.delete(id);
    }

    @Override
    public List<Dish> findAll() {
        return dishRepository.findAll();
    }

    @Override
    public boolean isExists(@Nonnull @NonNull Dish entity) {
        return dishRepository.isExists(entity);
    }
}
