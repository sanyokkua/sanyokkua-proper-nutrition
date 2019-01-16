package com.kostenko.pp.services;

import com.google.common.base.Preconditions;
import com.kostenko.pp.data.entity.User;
import com.kostenko.pp.data.repositories.UserRepository;
import com.kostenko.pp.services.page.PageInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static org.apache.commons.lang3.StringUtils.isBlank;

@Slf4j
@Service
public class UserService implements DBService<User> {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        Preconditions.checkNotNull(userRepository, "Null injected instead of " + UserRepository.class.getName());
        this.userRepository = userRepository;
    }

    public void createUser(User user) {
        if (!isValid(user)) {
            log.warn("CreateUser. User has incorrect fields. User: {}", user);
            throw new IllegalArgumentException("User have incorrect fields: " + user.toString());
        }
        final User byEmail = userRepository.findByEmail(user.getEmail());
        final User byLogin = userRepository.findByLogin(user.getLogin());
        if (byEmail == null && byLogin == null) {
            userRepository.save(user);
        } else {
            throw new IllegalArgumentException("User with login or email already exists: " + user.toString());
        }
    }

    private boolean isValid(User user) {
        Preconditions.checkNotNull(user, "isValid argument is null");
        return !isBlank(user.getEmail())
                && !isBlank(user.getLogin())
                && !isBlank(user.getPassword())
                && user.getRoleId() > 0
                && user.getAge() > 0
                && user.getHeight() > 0
                && user.getWeight() > 0;
    }

    public void updateUser(User user) {
        if (!isValid(user)) {
            log.warn("UpdateUser. User has incorrect fields. User: {}", user);
            throw new IllegalArgumentException("User have incorrect fields: " + user.toString());
        }
        final User userFromRepo = userRepository.findByEmail(user.getEmail());
        userFromRepo.setLogin(user.getLogin());
        userFromRepo.setEmail(user.getEmail());
        userFromRepo.setPassword(user.getPassword());
        userFromRepo.setRoleId(user.getRoleId());
        userFromRepo.setAge(user.getAge());
        userFromRepo.setGender(user.isGender());
        userFromRepo.setHeight(user.getHeight());
        userFromRepo.setWeight(user.getWeight());
        userRepository.save(userFromRepo);
    }

    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        log.info("getAllUsers. Found: {}", users.size());
        return users;
    }

    public User findByEmail(String email) {
        if (isBlank(email)) {
            log.warn("findByEmail. Email is blank");
            return null;
        }
        log.info("findByEmail. Looking for user with email {}", email);
        return userRepository.findByEmail(email);
    }

    public User findByLogin(String login) {
        if (isBlank(login)) {
            log.warn("findByLogin. Login is blank");
            return null;
        }
        log.info("findByLogin. Looking for user with login {}", login);
        return userRepository.findByLogin(login);
    }

    public void deleteUser(User user) {
        if (!isValid(user)) {
            log.warn("deleteUser. User has incorrect fields. User: {}", user);
            throw new RuntimeException("User have incorrect fields: " + user.toString());
        }
        if (user.getId() > 0) {
            log.info("deleteUser. Removing user with id: {}, email: {}, login: {}", user.getId(), user.getEmail(), user.getLogin());
            userRepository.deleteById(user.getId());
        } else {
            log.warn("deleteUser. Incorrect id: {} in user with email: {} and login: {}", user.getId(), user.getEmail(), user.getLogin());
        }
    }

    @Override
    public User findById(Long id) {
        return null;
    }

    @Override
    public User create(User data) {
        return null;
    }

    @Override
    public User update(User data) {
        return null;
    }

    @Override
    public Page<User> getAll(PageInfo pageInfo) {
        return null;
    }

    @Override
    public void delete(User data) {

    }
}
