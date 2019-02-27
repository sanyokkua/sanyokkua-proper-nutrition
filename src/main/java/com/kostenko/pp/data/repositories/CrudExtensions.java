package com.kostenko.pp.data.repositories;

import lombok.NonNull;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import javax.validation.constraints.NotBlank;

public interface CrudExtensions<T> {
    void createAll(Iterable<T> entities);
    boolean delete(@NonNull @Nonnull T entity);
    @Nullable
    T find(@NonNull @Nonnull T entity);
    @Nullable
    T findByField(@NotBlank String fieldValue);
    boolean isExistsId(@NonNull @Nonnull Long id);
    boolean isExists(@NonNull @Nonnull T entity);

}
