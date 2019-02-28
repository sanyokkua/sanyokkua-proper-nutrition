package com.kostenko.pp.data.repositories.jdbc;

import com.kostenko.pp.data.pojos.User;
import com.kostenko.pp.data.repositories.CrudExtensions;
import com.kostenko.pp.data.repositories.CrudRepository;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import javax.transaction.Transactional;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Repository
@Transactional
@Slf4j
public class UserRepository implements CrudRepository<User>, CrudExtensions<User> {
    @Override
    public void createAll(Iterable<User> entities) {

    }

    @Override
    public boolean delete(@Nonnull @NonNull User entity) {
        return false;
    }

    @Nullable
    @Override
    public User find(@Nonnull @NonNull User entity) {
        return null;
    }

    @Nullable
    @Override
    public User findByField(@NotBlank String fieldValue) {
        return null;
    }

    @Override
    public boolean isExistsId(@Nonnull @NonNull Long id) {
        return false;
    }

    @Override
    public boolean isExists(@Nonnull @NonNull User entity) {
        return false;
    }

    @Nullable
    @Override
    public User create(@Nonnull @NonNull User entity) {
        return null;
    }

    @Nullable
    @Override
    public User update(@Nonnull @NonNull User entity) {
        return null;
    }

    @Override
    public boolean delete(@Nonnull @NonNull Long id) {
        return false;
    }

    @Nullable
    @Override
    public User find(@Nonnull @NonNull Long id) {
        return null;
    }

    @Override
    public List<User> findAll() {
        return null;
    }
}
