package com.kostenko.pp.data.repositories.users;

import com.kostenko.pp.data.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    User findByEmail(String email);

    User findByLogin(String login);
}
