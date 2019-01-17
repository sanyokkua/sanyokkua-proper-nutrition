package com.kostenko.pp.data.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface GeneralRepository<T> {
    T findByName(String name);
    Page<T> findAll(Pageable pageable);
}
