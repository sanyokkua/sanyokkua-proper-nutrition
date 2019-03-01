package com.kostenko.pp.data.repositories.jdbc;

import com.kostenko.pp.data.pojos.Role;
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
public class RoleRepository implements CrudRepository<Role> {
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
        return find(holder.getKey().longValue());
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
}
