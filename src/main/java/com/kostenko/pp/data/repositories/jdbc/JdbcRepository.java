package com.kostenko.pp.data.repositories.jdbc;

import lombok.NonNull;
import org.springframework.dao.EmptyResultDataAccessException;

import javax.annotation.Nonnull;
import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Optional;
import java.util.function.Supplier;

public interface JdbcRepository<T> {

    Optional<T> findById(@NonNull @Nonnull Long id);

    Optional<T> findByUniqueField(@NotBlank String fieldValue);

    Optional<T> findByCustomQuery(@NotBlank String query);

    Optional<T> create(@NonNull @Nonnull T entity);

    Optional<T> update(@NonNull @Nonnull T entity);

    void delete(@NonNull @Nonnull T entity);

    void deleteById(@NonNull @Nonnull Long id);

    boolean isExistsId(@NonNull @Nonnull Long id);

    boolean isExists(@NonNull @Nonnull T entity);

    void createAll(Iterable<T> entities);

    List<T> findAll();

    List<T> findAllByCustomQuery(@NotBlank String query);

    static <T> Optional<T> getNullableResultIfException(Supplier<T> supplier) {
        T t = null;
        try {
            t = supplier.get();
        } catch (EmptyResultDataAccessException ex) {
            //TODO:
        }
        return Optional.ofNullable(t);
    }

}
