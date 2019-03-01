package com.kostenko.pp.data.repositories.jdbc;

import com.kostenko.pp.data.pojos.Gender;
import com.kostenko.pp.data.repositories.CrudRepository;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import javax.transaction.Transactional;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
@Transactional
@Slf4j
public class GenderRepository implements CrudRepository<Gender> {
    private static final RowMapper<Gender> ROW_MAPPER = (resultSet, i) -> Gender.builder().genderId(resultSet.getLong("gender_id")).genderName(resultSet.getString("name")).build();
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public GenderRepository(@NonNull @Nonnull JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Nullable
    @Override
    public Gender create(@Nonnull @NonNull Gender entity) {
        String sql = "insert into pp_app.gender (name) values (?)";
        GeneratedKeyHolder holder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, entity.getGenderName().toUpperCase());
            return statement;
        }, holder);
        return find(holder.getKey().longValue());
    }

    @Nullable
    @Override
    public Gender update(@Nonnull @NonNull Gender entity) {
        String sql = "update pp_app.gender set name=? where gender_id=?";
        jdbcTemplate.update(sql, entity.getGenderName().toUpperCase(), entity.getGenderId());
        return find(entity.getGenderId());
    }

    @Override
    public boolean delete(@Nonnull @NonNull Long id) {
        String sql = "delete from pp_app.gender where gender_id=?";
        int updated = jdbcTemplate.update(sql, id);
        return updated > 0;
    }

    @Nullable
    @Override
    public Gender find(@Nonnull @NonNull Long id) {
        String sql = "select * from pp_app.gender where gender_id = ?";
        return CrudRepository.getNullableResultIfException(() -> jdbcTemplate.queryForObject(sql, ROW_MAPPER, id)).orElse(null);
    }

    @Override
    public List<Gender> findAll() {
        String sql = "select * from pp_app.gender";
        return jdbcTemplate.query(sql, ROW_MAPPER);
    }
}
