package com.kostenko.pp.data.repositories.users;

import com.kostenko.pp.data.mappings.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {
}
