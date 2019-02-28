package com.kostenko.pp.data.services.implementation;

import com.kostenko.pp.data.pojos.Role;
import com.kostenko.pp.data.services.DBService;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Nonnull;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Slf4j
@Service
public class RoleService implements DBService<Role> {
    private final RoleService roleService;

    @Autowired
    public RoleService(@NonNull RoleService roleService) {this.roleService = roleService;}

    @Override
    public Role findById(@Nonnull @NonNull Long id) {
        return null;
    }

    @Override
    public Role findByField(@Nonnull @NonNull @NotBlank String field) {
        return null;
    }

    @Override
    public Role create(@Nonnull @NonNull Role entity) {
        return null;
    }

    @Override
    public Role update(@Nonnull @NonNull Role entity) {
        return null;
    }

    @Override
    public void delete(@Nonnull @NonNull Long id) {

    }

    @Override
    public List<Role> findAll() {
        return null;
    }

    @Override
    public boolean isExists(@Nonnull @NonNull Role entity) {
        return false;
    }
}
