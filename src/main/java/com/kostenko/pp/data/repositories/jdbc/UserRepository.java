package com.kostenko.pp.data.repositories.jdbc;

import com.kostenko.pp.data.pojos.User;
import com.kostenko.pp.data.repositories.CrudExtensions;
import com.kostenko.pp.data.repositories.CrudRepository;
import com.kostenko.pp.data.repositories.ExtendedSearch;
import com.kostenko.pp.data.repositories.SearchBuilder;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.NotImplementedException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import javax.transaction.Transactional;
import java.util.List;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Repository
@Transactional
@Slf4j
public class UserRepository implements CrudRepository<User>, CrudExtensions<User>, ExtendedSearch<User, UserRepository.UserSearchBuilder> {
    private final RowMapper<User> ROW_MAPPER_USER = (resultSet, i) -> User.builder()
                                                                          .userId(resultSet.getLong("user_id"))
                                                                          .email(resultSet.getString("email"))
                                                                          .password(resultSet.getString("password"))
                                                                          .weight(resultSet.getInt("weight"))
                                                                          .height(resultSet.getInt("height"))
                                                                          .age(resultSet.getInt("age"))
                                                                          .genderId(resultSet.getLong("gender_id"))
                                                                          .roleId(resultSet.getLong("role_id"))
                                                                          .build();
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserRepository(@NonNull @Nonnull JdbcTemplate jdbcTemplate) {this.jdbcTemplate = jdbcTemplate;}

    @Override
    public void createAll(Iterable<User> entities) {
        throw new NotImplementedException("Method is not implemented yet");
    }

    @Override
    public boolean delete(@Nonnull @NonNull User entity) {
        return delete(entity.getUserId());
    }

    @Nullable
    @Override
    public User find(@Nonnull @NonNull User entity) {
        return findByField(entity.getEmail());
    }

    @Nullable
    @Override
    public User findByField(@NonNull String fieldValue) {
        if (StringUtils.isBlank(fieldValue)) {
            return null;
        }
        String sql = "select u.user_id, u.age, u.email, u.height, u.password, u.weight, u.gender_id, u.role_id, r.name as r_name, g.name as g_name " +
                "from pp_app.appuser u, pp_app.gender g, pp_app.role r " +
                "where u.gender_id = g.gender_id and u.role_id = r.role_id and u.email = ?";
        return CrudRepository.getNullableResultIfException(() -> jdbcTemplate.queryForObject(sql, ROW_MAPPER_USER, fieldValue.toLowerCase())).orElse(null);
    }

    @Override
    public boolean isExistsId(@Nonnull @NonNull Long id) {
        String sql = "select count(user_id) from pp_app.appuser where user_id = ?;";
        long numberOfRows = jdbcTemplate.queryForObject(sql, (rs, rowNum) -> rs.getLong(1), id);
        return numberOfRows > 0;
    }

    @Override
    public boolean isExists(@Nonnull @NonNull User entity) {
        return nonNull(findByField(entity.getEmail()));
    }

    @Nullable
    @Override
    public User create(@Nonnull @NonNull User entity) {
        String email = entity.getEmail().toLowerCase();
        String password = entity.getPassword();
        Long role_id = entity.getRoleId();
        Long gender_id = entity.getGenderId();
        Integer age = entity.getAge();
        Integer height = entity.getHeight();
        Integer weight = entity.getWeight();

        String sql = "insert into pp_app.appuser (age, email, height, password, weight, gender_id, role_id) values (?,?,?,?,?,?,?)";
        jdbcTemplate.update(sql, age, email, height, password, weight, gender_id, role_id);
        return findByField(email);
    }

    @Nullable
    @Override
    public User update(@Nonnull @NonNull User entity) {
        String email = entity.getEmail().toLowerCase();
        String password = entity.getPassword();
        long role_id = entity.getRoleId();
        long gender_id = entity.getGenderId();
        int age = entity.getAge();
        int height = entity.getHeight();
        int weight = entity.getWeight();

        String sql = "update pp_app.appuser set age=?, email=?, height=?, password=?, weight=?, gender_id=?, role_id=? where user_id=?";
        jdbcTemplate.update(sql, age, email, height, password, weight, gender_id, role_id, entity.getUserId());
        return findByField(email);
    }

    @Override
    public boolean delete(@Nonnull @NonNull Long id) {
        String deleteUserSql = "delete from pp_app.appuser where user_id=?";
        String deleteUserDishesSql = "delete from pp_app.user_dishes where user_id=?";
        int updated = jdbcTemplate.update(deleteUserSql, id);
        jdbcTemplate.update(deleteUserDishesSql, id);
        return updated > 0;
    }

    @Nullable
    @Override
    public User find(@Nonnull @NonNull Long id) {
        String sql = "select u.user_id, u.age, u.email, u.height, u.password, u.weight, u.gender_id, u.role_id, r.name as r_name, g.name as g_name " +
                "from pp_app.appuser u, pp_app.gender g, pp_app.role r " +
                "where u.gender_id = g.gender_id and u.role_id = r.role_id and u.user_id = ?";
        return CrudRepository.getNullableResultIfException(() -> jdbcTemplate.queryForObject(sql, ROW_MAPPER_USER, id)).orElse(null);
    }

    @Override
    public List<User> findAll() {
        String sql = "select u.user_id, u.age, u.email, u.height, u.password, u.weight, u.gender_id, u.role_id, r.name as r_name, g.name as g_name " +
                "from pp_app.appuser u, pp_app.gender g, pp_app.role r " +
                "where u.gender_id = g.gender_id and u.role_id = r.role_id";
        return jdbcTemplate.query(sql, ROW_MAPPER_USER);
    }

    @Override
    public UserSearchBuilder findByPages() {
        return new UserSearchBuilder();
    }

    public class UserSearchBuilder implements SearchBuilder<User> {
        private final String select = "select u.user_id, u.age, u.email, u.height, u.password, u.weight, u.gender_id, u.role_id, r.name as r_name, g.name as g_name ";
        private final String from = "from pp_app.appuser u, pp_app.gender g, pp_app.role r ";
        private String where = "where u.gender_id = g.gender_id and u.role_id = r.role_id ";
        private Pageable pageable;

        @Override
        public UserSearchBuilder begin(@Nonnull @NonNull Pageable pageable) {
            this.pageable = pageable;
            return this;
        }

        @Override
        public Page<User> invoke() {
            if (isNull(pageable)) {
                throw new IllegalArgumentException("Pageable is null. You should call begin method with not null pageable");
            }
            String countQuery = "select count(1) as row_count " + from + where;
            int total = jdbcTemplate.queryForObject(countQuery, (rs, rowNum) -> rs.getInt(1));
            String querySql = select + from + where + "limit " + pageable.getPageSize() + " " + "offset " + pageable.getOffset();
            List<User> users = jdbcTemplate.query(querySql, ROW_MAPPER_USER);
            return new PageImpl<>(users, pageable, total);
        }

        public UserSearchBuilder addRole(Long roleId) {
            if (nonNull(roleId) && roleId >= 0) {
                where += " and u.role_id = " + roleId + " ";
            }
            return this;
        }

        public UserSearchBuilder addGender(Long genderId) {
            if (nonNull(genderId) && genderId >= 0) {
                where += " and u.gender_id = " + genderId + " ";
            }
            return this;
        }

        public UserSearchBuilder addEmail(String email) {
            if (StringUtils.isNotBlank(email)) {
                String like = String.format("'%%%s%%'", email.toLowerCase());
                where += " and u.email like " + like;
            }
            return this;
        }
    }
}
