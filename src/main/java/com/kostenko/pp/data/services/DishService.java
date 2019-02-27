package com.kostenko.pp.data.services;

import com.kostenko.pp.data.PageableSearch;
import com.kostenko.pp.data.repositories.jdbc.DishRepository;
import com.kostenko.pp.data.views.Dish;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.annotation.Nonnull;
import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service
public class DishService implements DBService<Dish>, PageableSearch<Dish> {
    public static final String NAME = "name";
    public static final String PAGE = "page";
    public static final String RECORDS = "records";

    private final DishRepository dishRepository;

    @Autowired
    public DishService(DishRepository dishRepository) {
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

    @Override
    public Page<Dish> findAll(@Nonnull @NonNull SearchParams searchParams) {
        Page<Dish> result;
        int pageNumber = getDbPageNumber(searchParams.getInt(PAGE));
        int recordsPerPage = getRecordsPerPage(searchParams.getInt(RECORDS));

        if (searchParams.hasParam(NAME)) {
            result = dishRepository.findAllByPageAndName(PageRequest.of(pageNumber, recordsPerPage), searchParams.getString(NAME));
        } else {
            result = dishRepository.findAllByPage(PageRequest.of(pageNumber, recordsPerPage));
        }
        return result;
    }

}
