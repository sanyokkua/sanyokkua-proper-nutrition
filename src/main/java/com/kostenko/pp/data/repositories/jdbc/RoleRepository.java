package com.kostenko.pp.data.repositories.jdbc;

import com.kostenko.pp.data.pojos.Role;
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

import static java.util.Objects.isNull;

@Repository
@Transactional
@Slf4j
public class RoleRepository implements CrudRepository<Role>, CrudExtensions<Role> {
    private static final RowMapper<Role> ROW_MAPPER = (resultSet, i) -> Role.builder().roleId(resultSet.getLong("role_id"))
                                                                            .roleName(resultSet.getString("name"))
                                                                            .build();
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public RoleRepository(@NonNull @Nonnull JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Nullable
    @Override
    public Role create(@Nonnull @NonNull Role entity) {
        String sql = "insert into pp_app.role (name) values (?)";
        GeneratedKeyHolder holder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            statement.setString(1, entity.getRoleName().toUpperCase());
            return statement;
        }, holder);
        Object role_id = holder.getKeys().get("role_id");
        return find((long) role_id);
    }

    @Nullable
    @Override
    public Role update(@Nonnull @NonNull Role entity) {
        String sql = "update pp_app.role set name=? where role_id=?";
        jdbcTemplate.update(sql, entity.getRoleName().toUpperCase(), entity.getRoleId());
        return find(entity.getRoleId());
    }

    @Override
    public boolean delete(@Nonnull @NonNull Long id) {
        String sql = "delete from pp_app.role where role_id=?";
        int updated = jdbcTemplate.update(sql, id);
        return updated > 0;
    }

    @Nullable
    @Override
    public Role find(@Nonnull @NonNull Long id) {
        String sql = "select * from pp_app.role r where r.role_id = ?";
        return CrudRepository.getNullableResultIfException(() -> jdbcTemplate.queryForObject(sql, ROW_MAPPER, id)).orElse(null);
    }

    @Override
    public List<Role> findAll() {
        String sql = "select * from pp_app.role";
        return jdbcTemplate.query(sql, ROW_MAPPER);
    }

    @Override
    public void createAll(Iterable<Role> entities) {
        throw new NotImplementedException("Method createAll has not implemented yet");
    }

    @Override
    public boolean delete(@Nonnull @NonNull Role entity) {
        return delete(entity.getRoleId());
    }

    @Nullable
    @Override
    public Role find(@Nonnull @NonNull Role entity) {
        return findByField(entity.getRoleName());
    }

    @Nullable
    @Override
    public Role findByField(@NonNull String fieldValue) {
        if (StringUtils.isBlank(fieldValue)) {
            return null;
        }
        String sql = "select * from pp_app.role r where r.name = ?";
        return CrudRepository.getNullableResultIfException(() -> jdbcTemplate.queryForObject(sql, ROW_MAPPER, fieldValue.toUpperCase())).orElse(null);
    }

    @Override
    public boolean isExistsId(@Nonnull @NonNull Long id) {
        return !isNull(find(id));
    }

    @Override
    public boolean isExists(@Nonnull @NonNull Role entity) {
        return !isNull(findByField(entity.getRoleName()));
    }
}
