package com.kostenko.pp.data.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SearchBuilder<T> {
    SearchBuilder<T> begin(Pageable pageable);
    Page<T> invoke();
}
