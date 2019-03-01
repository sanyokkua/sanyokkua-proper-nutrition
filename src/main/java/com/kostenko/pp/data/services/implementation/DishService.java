package com.kostenko.pp.data.services.implementation;

import com.kostenko.pp.data.RecordAlreadyExistsException;
import com.kostenko.pp.data.pojos.Dish;
import com.kostenko.pp.data.repositories.jdbc.DishRepository;
import com.kostenko.pp.data.services.PageableDBService;
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
public class DishService implements PageableDBService<Dish> {
    public static final String NAME = "name";
    public static final String PAGE = "page";
    public static final String RECORDS = "records";

    private final DishRepository dishRepository;

    @Autowired
    public DishService(DishRepository dishRepository) {
        this.dishRepository = Objects.requireNonNull(dishRepository, "Injected null");
    }

    @Override
    public Dish findById(@Nonnull @NonNull Long id) {
        log.info("Searching dish with id: {}", id);
        return dishRepository.find(id);
    }

    @Override
    public Dish findByField(@Nonnull @NonNull @NotBlank String field) {
        log.info("Searching dish with name: {}", field);
        return dishRepository.findByField(field);
    }

    @Override
    public Dish create(@NonNull @Nonnull Dish dish) {
        Dish founded = dishRepository.findByField(dish.getDishName());
        if (Objects.isNull(founded)) {
            log.info("Creating dish: {}", dish.toString());
            if (!dish.getDishProducts().isEmpty()) {
                return dishRepository.create(dish);
            } else {
                throw new IllegalArgumentException("Dish with name: '" + dish.getDishName() + "' doesn't have products");
            }
        } else {
            throw new RecordAlreadyExistsException("Dish with name: '" + dish.getDishName() + "' is already exists in the DB");
        }
    }

    @Override
    public Dish update(@NonNull @Nonnull Dish dish) {
        Dish founded = dishRepository.findByField(dish.getDishName());
        if (!Objects.isNull(founded)) {
            log.info("Updating dish: {} to {}", founded.toString(), dish);
            if (!dish.getDishProducts().isEmpty()) {
                founded.setDishName(dish.getDishName());
                founded.setDishProducts(dish.getDishProducts());
                return dishRepository.update(founded);
            } else {
                throw new IllegalArgumentException("Dish with name: '" + dish.getDishName() + "' doesn't have products to update");
            }
        } else {
            throw new RecordAlreadyExistsException("Dish with name: '" + dish.getDishName() + "' is not exists in the DB");
        }
    }

    @Override
    public void delete(@NonNull @Nonnull Long id) {
        log.info("Deleting dish with id: {}", id);
        boolean isDeleted = dishRepository.delete(id);
        log.info("Dish with id: {} is deleted: {}", id, isDeleted);
    }

    @Override
    public List<Dish> findAll() {
        return dishRepository.findAll();
    }

    @Override
    public boolean isExists(@Nonnull @NonNull Dish entity) {
        boolean exists = dishRepository.isExists(entity);
        log.info("Dish: {} is exists: {}", entity.toString(), exists);
        return exists;
    }

    @Override
    public Page<Dish> findAll(@Nonnull @NonNull SearchParams searchParams) {
        log.info("searching all records with options: {}", searchParams.toString());
        Page<Dish> result;
        int pageNumber = getDbPageNumber(searchParams.getInt(PAGE));
        int recordsPerPage = getRecordsPerPage(searchParams.getInt(RECORDS));
        if (searchParams.hasParam(NAME)) {
            result = dishRepository.find().begin(PageRequest.of(pageNumber, recordsPerPage)).addName(searchParams.getString(NAME)).invoke();
        } else {
            result = dishRepository.find().begin(PageRequest.of(pageNumber, recordsPerPage)).invoke();
        }
        return result;
    }

}
