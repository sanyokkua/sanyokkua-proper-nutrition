package com.kostenko.pp.data.repositories.jdbc;

import com.kostenko.pp.data.pojos.Gender;
import com.kostenko.pp.data.repositories.CrudRepository;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
@Slf4j
public class GenderRepository implements CrudRepository<Gender> {
    @Nullable
    @Override
    public Gender create(@Nonnull @NonNull Gender entity) {
        return null;
    }

    @Nullable
    @Override
    public Gender update(@Nonnull @NonNull Gender entity) {
        return null;
    }

    @Override
    public boolean delete(@Nonnull @NonNull Long id) {
        return false;
    }

    @Nullable
    @Override
    public Gender find(@Nonnull @NonNull Long id) {
        return null;
    }

    @Override
    public List<Gender> findAll() {
        return null;
    }
}
