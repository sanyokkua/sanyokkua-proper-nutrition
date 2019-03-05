package com.kostenko.pp.data.services.implementation;

import com.kostenko.pp.data.pojos.Role;
import com.kostenko.pp.data.repositories.jdbc.RoleRepository;
import com.kostenko.pp.data.services.DBService;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Nonnull;
import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Objects;

import static java.util.Objects.isNull;

@Slf4j
@Service
public class RoleService implements DBService<Role> {
    private final RoleRepository roleRepository;

    @Autowired
    public RoleService(@NonNull RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Role findById(@Nonnull @NonNull Long id) {
        log.info("Looking for Role with id = {}", id);
        Role role = roleRepository.find(id);
        log.info("Founded role: {}", role);
        return role;
    }

    @Override
    public Role findByField(@Nonnull @NonNull @NotBlank String field) {
        return null;
    }

    @Override
    public Role create(@Nonnull @NonNull Role entity) {
        if (StringUtils.isBlank(entity.getRoleName())) {
            throw new IllegalArgumentException("Role name is blank. With blank field entity can't be created");
        }
        if (isExists(entity)) {
            throw new IllegalArgumentException("Role with name: " + entity.getRoleName() + " already exists");
        }
        return roleRepository.create(entity);
    }

    @Override
    public Role update(@Nonnull @NonNull Role entity) {
        if (isNull(entity.getRoleId()) && StringUtils.isBlank(entity.getRoleName())) {
            throw new IllegalArgumentException("Role id or name is null. Role can't be updated. Role = " + entity);
        }
        if (!isExists(entity)) {
            throw new IllegalArgumentException("Role with name: " + entity.getRoleName() + " is not exists");
        }
        return roleRepository.update(entity);
    }

    @Override
    public void delete(@Nonnull @NonNull Long id) {
        log.info("Deleting Role with id = {}", id);
        boolean isDeleted = roleRepository.delete(id);
        log.info("Role with id = {} is deleted: {}", id, isDeleted);
    }

    @Override
    public List<Role> findAll() {
        return roleRepository.findAll();
    }

    @Override
    public boolean isExists(@Nonnull @NonNull Role entity) {
        Role role = roleRepository.find(entity.getRoleId());
        return !Objects.isNull(role);
    }
}
