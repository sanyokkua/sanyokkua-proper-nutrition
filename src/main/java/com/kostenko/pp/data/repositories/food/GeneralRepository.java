package com.kostenko.pp.data.repositories.food;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface GeneralRepository<T> {
    T findByName(String name);
    Page<T> findAll(Pageable pageable);
}
