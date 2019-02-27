package com.kostenko.pp.data.repositories;

import lombok.NonNull;
import org.springframework.dao.EmptyResultDataAccessException;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;

public interface CrudRepository<T> {
    static <T> Optional<T> getNullableResultIfException(Supplier<T> supplier) {
        T t = null;
        try {
            t = supplier.get();
        } catch (EmptyResultDataAccessException ex) {
            //TODO:
        }
        return Optional.ofNullable(t);
    }
    @Nullable
    T create(@NonNull @Nonnull T entity);
    @Nullable
    T update(@NonNull @Nonnull T entity);
    boolean delete(@NonNull @Nonnull Long id);
    @Nullable
    T find(@NonNull @Nonnull Long id);
    List<T> findAll();
}
