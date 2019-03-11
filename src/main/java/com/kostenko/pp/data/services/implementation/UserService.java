package com.kostenko.pp.data.services.implementation;

import com.kostenko.pp.configuration.UserRoles;
import com.kostenko.pp.data.PageableSearch;
import com.kostenko.pp.data.pojos.Role;
import com.kostenko.pp.data.pojos.User;
import com.kostenko.pp.data.repositories.jdbc.GenderRepository;
import com.kostenko.pp.data.repositories.jdbc.RoleRepository;
import com.kostenko.pp.data.repositories.jdbc.UserRepository;
import com.kostenko.pp.data.services.DBService;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.annotation.Nonnull;
import java.util.List;

import static java.util.Objects.isNull;

@Slf4j
@Service
public class UserService implements DBService<User>, PageableSearch<User> {
    public static final String PAGE = "page";
    public static final String RECORDS = "records";
    public static final String ROLE = "role";
    public static final String GENDER = "gender";
    public static final String EMAIL = "email";
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final GenderRepository genderRepository;

    public UserService(@Nonnull @NonNull UserRepository userRepository, @Nonnull @NonNull RoleRepository roleRepository, @Nonnull @NonNull GenderRepository genderRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.genderRepository = genderRepository;
    }

    @Override
    public Page<User> findAll(@Nonnull @NonNull SearchParams searchParams) {
        log.info("searching all records with options: {}", searchParams.toString());
        Page<User> result;
        int pageNumber = getDbPageNumber(searchParams.getInt(PAGE));
        int recordsPerPage = getRecordsPerPage(searchParams.getInt(RECORDS));
        result = userRepository.findByPages().begin(PageRequest.of(pageNumber, recordsPerPage))
                               .addEmail(searchParams.getString(EMAIL))
                               .addGender(searchParams.getLong(GENDER))
                               .addRole(searchParams.getLong(ROLE))
                               .invoke();
        return result;
    }

    @Override
    public User findById(@Nonnull @NonNull Long id) {
        return userRepository.find(id);
    }

    @Override
    public User findByField(@Nonnull @NonNull String field) {
        if (StringUtils.isBlank(field)) {
            return null;
        }
        return userRepository.findByField(field);
    }

    @Override
    public User create(@Nonnull @NonNull User entity) {
        if (isNotValid(entity) && StringUtils.isBlank(entity.getPassword())) {
            throw new IllegalArgumentException("User entity is not valid");
        }
        if (userRepository.isExists(entity)) {
            throw new IllegalArgumentException("User with email: " + entity.getEmail() + " already exists");
        }
        fillDefaultValues(entity);
        return userRepository.create(entity);
    }

    private boolean isNotValid(User entity) {
        return isNull(entity) || StringUtils.isBlank(entity.getEmail());
    }

    private void fillDefaultValues(User entity) {
        if (isNull(entity.getRoleId())) {
            Role defaultRole = roleRepository.findByField(UserRoles.USER.getRoleName());
            entity.setRoleId(defaultRole.getRoleId());
            entity.setRoleName(defaultRole.getRoleName());
        }
    }

    @Override
    public User update(@Nonnull @NonNull User entity) {
        if (isNotValid(entity)) {
            throw new IllegalArgumentException("User entity is not valid");
        }
        if (!userRepository.isExists(entity)) {
            throw new IllegalArgumentException("User with email: " + entity.getEmail() + " is not exists");
        }
        fillDefaultValues(entity);
        return userRepository.update(entity);
    }

    @Override
    public void delete(@Nonnull @NonNull Long id) {
        log.info("Deleting User with id = {}", id);
        boolean isDeleted = userRepository.delete(id);
        log.info("User with id = {} is deleted: {}", id, isDeleted);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public boolean isExists(@Nonnull @NonNull User entity) {
        return userRepository.isExists(entity);
    }
}
