package com.kostenko.pp.data.repositories.jdbc;

import com.kostenko.pp.data.pojos.Role;
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
public class RoleRepository implements CrudRepository<Role> {
    @Nullable
    @Override
    public Role create(@Nonnull @NonNull Role entity) {
        return null;
    }

    @Nullable
    @Override
    public Role update(@Nonnull @NonNull Role entity) {
        return null;
    }

    @Override
    public boolean delete(@Nonnull @NonNull Long id) {
        return false;
    }

    @Nullable
    @Override
    public Role find(@Nonnull @NonNull Long id) {
        return null;
    }

    @Override
    public List<Role> findAll() {
        return null;
    }
}
