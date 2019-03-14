package com.kostenko.pp.data.repositories.jdbc;

import com.kostenko.pp.data.pojos.Gender;
import com.kostenko.pp.data.repositories.CrudExtensions;
import com.kostenko.pp.data.repositories.CrudRepository;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.NotImplementedException;
import org.apache.commons.lang3.StringUtils;
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

import static java.util.Objects.nonNull;

@Repository
@Transactional
@Slf4j
public class GenderRepository implements CrudRepository<Gender>, CrudExtensions<Gender> {
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
        Object gender_id = holder.getKeys().get("gender_id");
        return find((long) gender_id);
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

    @Override
    public void createAll(Iterable<Gender> entities) {
        throw new NotImplementedException("Method createAll has not implemented yet");
    }

    @Override
    public boolean delete(@Nonnull @NonNull Gender entity) {
        return delete(entity.getGenderId());
    }

    @Nullable
    @Override
    public Gender find(@Nonnull @NonNull Gender entity) {
        return findByField(entity.getGenderName());
    }

    @Nullable
    @Override
    public Gender findByField(@NonNull String fieldValue) {
        if (StringUtils.isBlank(fieldValue)) {
            return null;
        }
        String sql = "select * from pp_app.gender where name = ?";
        return CrudRepository.getNullableResultIfException(() -> jdbcTemplate.queryForObject(sql, ROW_MAPPER, fieldValue.toUpperCase())).orElse(null);
    }

    @Override
    public boolean isExistsId(@Nonnull @NonNull Long id) {
        return nonNull(find(id));
    }

    @Override
    public boolean isExists(@Nonnull @NonNull Gender entity) {
        return nonNull(findByField(entity.getGenderName()));
    }
}
