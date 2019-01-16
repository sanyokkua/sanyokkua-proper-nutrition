package com.kostenko.pp.services;

import com.kostenko.pp.services.page.PageInfo;
import org.springframework.data.domain.Page;

public interface DBService<T> {
    T findById(Long id);
    T create(T data);
    T update(T data);
    Page<T> getAll(PageInfo pageInfo);
    void delete(T data);
}
