package com.kostenko.pp.services;

import com.google.common.base.Preconditions;
import com.kostenko.pp.data.entities.AppUser;
import com.kostenko.pp.data.repositories.users.UserRepository;
import com.kostenko.pp.services.page.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static org.apache.commons.lang3.StringUtils.isBlank;

@Slf4j
@Service
public class UserService implements DBService<AppUser> {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = Objects.requireNonNull(userRepository, "Instead of UserRepository instance injected null");
    }

    public void createUser(AppUser user) {
        if (!isValid(user)) {
            log.warn("CreateUser. AppUser has incorrect fields. AppUser: {}", user);
            throw new IllegalArgumentException("AppUser have incorrect fields: " + user.toString());
        }
        final AppUser byEmail = userRepository.findByEmail(user.getEmail());
        final AppUser byLogin = userRepository.findByLogin(user.getLogin());
        if (byEmail == null && byLogin == null) {
            userRepository.save(user);
        } else {
            throw new IllegalArgumentException("AppUser with login or email already exists: " + user.toString());
        }
    }

    private boolean isValid(AppUser user) {
        Preconditions.checkNotNull(user, "isValid argument is null");
        return !isBlank(user.getEmail())
                && !isBlank(user.getLogin())
                && !isBlank(user.getPassword())
                && user.getRole().getRoleId() > 0
                && user.getAge() > 0
                && user.getHeight() > 0
                && user.getWeight() > 0;
    }

    public void updateUser(AppUser user) {
        if (!isValid(user)) {
            log.warn("UpdateUser. AppUser has incorrect fields. AppUser: {}", user);
            throw new IllegalArgumentException("AppUser have incorrect fields: " + user.toString());
        }
        final AppUser userFromRepo = userRepository.findByEmail(user.getEmail());
        userFromRepo.setLogin(user.getLogin());
        userFromRepo.setEmail(user.getEmail());
        userFromRepo.setPassword(user.getPassword());
        userFromRepo.setRole(user.getRole());
        userFromRepo.setAge(user.getAge());
        userFromRepo.setGender(user.getGender());
        userFromRepo.setHeight(user.getHeight());
        userFromRepo.setWeight(user.getWeight());
        userRepository.save(userFromRepo);
    }

    public List<AppUser> getAllUsers() {
        List<AppUser> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        log.info("getAllUsers. Found: {}", users.size());
        return users;
    }

    public AppUser findByEmail(String email) {
        if (isBlank(email)) {
            log.warn("findByEmail. Email is blank");
            return null;
        }
        log.info("findByEmail. Looking for user with email {}", email);
        return userRepository.findByEmail(email);
    }

    public AppUser findByLogin(String login) {
        if (isBlank(login)) {
            log.warn("findByLogin. Login is blank");
            return null;
        }
        log.info("findByLogin. Looking for user with login {}", login);
        return userRepository.findByLogin(login);
    }

    public void deleteUser(AppUser user) {
        if (!isValid(user)) {
            log.warn("deleteUser. AppUser has incorrect fields. AppUser: {}", user);
            throw new RuntimeException("AppUser have incorrect fields: " + user.toString());
        }
        if (user.getUserId() > 0) {
            log.info("deleteUser. Removing user with id: {}, email: {}, login: {}", user.getUserId(), user.getEmail(), user.getLogin());
            userRepository.deleteById(user.getUserId());
        } else {
            log.warn("deleteUser. Incorrect id: {} in user with email: {} and login: {}", user.getUserId(), user.getEmail(), user.getLogin());
        }
    }

    @Override
    public AppUser findById(Long id) {
        return null;
    }

    @Override
    public AppUser create(AppUser data) {
        return null;
    }

    @Override
    public AppUser update(AppUser data) {
        return null;
    }

    @Override
    public AppUser createOrUpdate(AppUser data) {
        return null;
    }

    @Override
    public Page<AppUser> getAll(PageInfo pageInfo) {
        return null;
    }

    @Override
    public void delete(AppUser data) {

    }
}
