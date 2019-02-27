package com.kostenko.pp.data.services;

import lombok.NonNull;

import javax.annotation.Nonnull;
import javax.validation.constraints.NotBlank;
import java.util.List;

public interface DBService<T> {
    T findById(@Nonnull @NonNull Long id);
    T findByField(@Nonnull @NonNull @NotBlank String field);
    T create(@Nonnull @NonNull T entity);
    T update(@Nonnull @NonNull T entity);
    void delete(@Nonnull @NonNull Long id);
    List<T> findAll();
    boolean isExists(@Nonnull @NonNull T entity);
}
