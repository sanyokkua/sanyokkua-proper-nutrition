package com.kostenko.pp.services;

import com.google.common.base.Preconditions;
import com.kostenko.pp.data.repositories.DishRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DishesService {
    private final DishRepository dishRepository;

    @Autowired
    public DishesService(DishRepository dishRepository) {
        Preconditions.checkNotNull(dishRepository, "Null injected instead of " + DishRepository.class.getName());
        this.dishRepository = dishRepository;
    }
}
