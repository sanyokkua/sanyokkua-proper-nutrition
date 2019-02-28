package com.kostenko.pp.data.services.implementation;

import com.kostenko.pp.data.PageableSearch;
import com.kostenko.pp.data.pojos.User;
import com.kostenko.pp.data.repositories.jdbc.GenderRepository;
import com.kostenko.pp.data.repositories.jdbc.RoleRepository;
import com.kostenko.pp.data.repositories.jdbc.UserRepository;
import com.kostenko.pp.data.services.DBService;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import javax.annotation.Nonnull;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Slf4j
@Service
public class UserService implements DBService<User>, PageableSearch<User> {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final GenderRepository genderRepository;

    public UserService(@NonNull UserRepository userRepository, @NonNull RoleRepository roleRepository, @NonNull GenderRepository genderRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.genderRepository = genderRepository;
    }

    @Override
    public Page<User> findAll(@Nonnull @NonNull SearchParams searchParams) {
        return null;
    }

    @Override
    public User findById(@Nonnull @NonNull Long id) {
        return null;
    }

    @Override
    public User findByField(@Nonnull @NonNull @NotBlank String field) {
        return null;
    }

    @Override
    public User create(@Nonnull @NonNull User entity) {
        return null;
    }

    @Override
    public User update(@Nonnull @NonNull User entity) {
        return null;
    }

    @Override
    public void delete(@Nonnull @NonNull Long id) {

    }

    @Override
    public List<User> findAll() {
        return null;
    }

    @Override
    public boolean isExists(@Nonnull @NonNull User entity) {
        return false;
    }
}
