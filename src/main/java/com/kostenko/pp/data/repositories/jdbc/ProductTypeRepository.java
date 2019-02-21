package com.kostenko.pp.data.repositories.jdbc;

import com.google.common.collect.Lists;
import com.kostenko.pp.data.entities.ProductType;
import lombok.NonNull;
import org.apache.commons.lang3.NotImplementedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import javax.annotation.Nonnull;
import javax.transaction.Transactional;
import javax.validation.constraints.NotBlank;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Repository
@Transactional
public class ProductTypeRepository implements JdbcRepository<ProductType> {
    private static final RowMapper<ProductType> ROW_MAPPER = (resultSet, i) -> ProductType.builder().prodTypeId(resultSet.getLong("prod_type_id")).name(resultSet.getString("name")).build();
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ProductTypeRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = Objects.requireNonNull(jdbcTemplate);
    }

    @Override
    public Optional<ProductType> findById(@Nonnull @NonNull Long id) {
        return JdbcRepository.getNullableResultIfException(() -> jdbcTemplate.queryForObject("select * " + "from pp_app.prod_type t " + "where t.prod_type_id = ?", ROW_MAPPER, id));
    }

    @Override
    public Optional<ProductType> findByUniqueField(@NotBlank String fieldValue) {
        return JdbcRepository.getNullableResultIfException(() -> jdbcTemplate.queryForObject("select * " + "from pp_app.prod_type t " + "where t.name = ?", ROW_MAPPER, fieldValue));

    }

    @Override
    public Optional<ProductType> findByCustomQuery(@NotBlank String query) {
        return JdbcRepository.getNullableResultIfException(() -> jdbcTemplate.queryForObject(query, ROW_MAPPER));
    }

    @Override
    public Optional<ProductType> create(@Nonnull @NonNull ProductType entity) {
        jdbcTemplate.update("insert into pp_app.prod_type (name) values (?)", entity.getName());
        return findByUniqueField(entity.getName());
    }

    @Override
    public Optional<ProductType> update(@Nonnull @NonNull ProductType entity) {
        jdbcTemplate.update("update pp_app.prod_type set name=? where prod_type_id=?", entity.getName(), entity.getProdTypeId());
        return findByUniqueField(entity.getName());
    }

    @Override
    public void delete(@Nonnull @NonNull ProductType entity) {
        deleteById(entity.getProdTypeId());
    }

    @Override
    public void deleteById(@Nonnull @NonNull Long id) {
        jdbcTemplate.update("delete from pp_app.prod_type where prod_type_id=?", id);
    }

    @Override
    public boolean isExistsId(@Nonnull @NonNull Long id) {
        long numberOfRows = jdbcTemplate.queryForObject("select count(prod_type_id) from pp_app.prod_type where prod_type_id = ?;", (rs, rowNum) -> rs.getLong(1), id);
        return numberOfRows > 0;
    }

    @Override
    public boolean isExists(@Nonnull @NonNull ProductType entity) {
        return findByUniqueField(entity.getName()).isPresent();
    }

    @Override
    public void createAll(Iterable<ProductType> entities) {
        final int batchSize = 100;
        List<List<ProductType>> batchLists = Lists.partition(Lists.newArrayList(entities), batchSize);
        for (List<ProductType> batch : batchLists) {
            jdbcTemplate.batchUpdate("insert into pp_app.prod_type (name) values (?)", new BatchPreparedStatementSetter() {
                @Override
                public void setValues(PreparedStatement ps, int i) throws SQLException {
                    ProductType product = batch.get(i);
                    ps.setString(1, product.getName());
                }

                @Override
                public int getBatchSize() {
                    return batch.size();
                }
            });
        }
    }

    @Override
    public List<ProductType> findAll() {
        return jdbcTemplate.query("select * " + "from pp_app.prod_type t ", ROW_MAPPER);
    }

    @Override
    public List<ProductType> findAllByCustomQuery(@NotBlank String query) {
        throw new NotImplementedException("findAllByCustomQuery is not implemented yet");
    }
}
