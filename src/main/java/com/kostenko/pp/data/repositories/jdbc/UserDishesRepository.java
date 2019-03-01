package com.kostenko.pp.data.repositories.jdbc;

import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.Nonnull;

@Repository
public class UserDishesRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserDishesRepository(@NonNull @Nonnull JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
}
