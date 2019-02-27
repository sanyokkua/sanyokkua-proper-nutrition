package com.kostenko.pp.data.repositories.users;

import com.kostenko.pp.data.mappings.AppUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<AppUser, Long> {

    AppUser findByEmail(String email);

    AppUser findByLogin(String login);
}
