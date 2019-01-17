package com.kostenko.pp.services;

import com.google.common.base.Preconditions;
import com.kostenko.pp.data.entity.Dish;
import com.kostenko.pp.data.repositories.DishRepository;
import com.kostenko.pp.services.page.PageInfo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service("DishesDBService")
public class DishesDBService implements DBService<Dish> {
    private final DishRepository dishRepository;

    @Autowired
    public DishesDBService(DishRepository dishRepository) {
        Preconditions.checkNotNull(dishRepository, "Null injected instead of " + DishRepository.class.getName());
        this.dishRepository = dishRepository;
    }

    @Override
    public Dish findById(Long id) {
        Preconditions.checkNotNull(id, "ID can't be null");
        return dishRepository.findById(id).orElse(null);
    }

    @Override
    public Dish create(Dish data) {
        validate(data);
        Dish dbDish = dishRepository.findByName(data.getName());
        if (dbDish == null) {
            dbDish = dishRepository.save(data);
        } else {
            throw new IllegalArgumentException("Dish with name: " + data.getName() + " already exists");
        }
        return dbDish;
    }

    @Override
    public Dish update(Dish data) {
        validate(data);
        Dish dbDish = dishRepository.findById(data.getId()).orElse(null);
        if (dbDish == null) {
            throw new IllegalArgumentException("Dish with id " + data.getId() + " doesn't exists. Update can't be done");
        } else {
            dbDish = dishRepository.save(data);
        }
        return dbDish;
    }

    @Override
    public Page<Dish> getAll(PageInfo pageInfo) {
        Page<Dish> page;
        if (StringUtils.isBlank(pageInfo.getParam(PageInfo.SEARCH_STRING))) {
            page = dishRepository.findAll(PageRequest.of(pageInfo.getDbPageNumber(), pageInfo.getRecordsPerPage()));
        } else {
            page = dishRepository.findAllByNameIsContaining(PageRequest.of(pageInfo.getDbPageNumber(), pageInfo.getRecordsPerPage()), pageInfo.getParam(PageInfo.SEARCH_STRING));
        }
        return page;
    }

    @Override
    public void delete(Dish data) {
        validate(data);
        dishRepository.delete(data);
    }

    private void validate(Dish dish) {
        if (!isValid(dish)) {
            throw new IllegalArgumentException("Dish has invalid fields: " + dish.toString());
        }
    }

    private boolean isValid(Dish dish) {
        return dish != null && dish.getName().length() > 0 && dish.getProducts().length() > 0;
    }
}
