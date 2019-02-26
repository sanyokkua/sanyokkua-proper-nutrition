package com.kostenko.pp.data.repositories.jdbc;

import com.google.common.collect.Lists;
import com.kostenko.pp.data.entities.Product;
import com.kostenko.pp.data.entities.ProductType;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.NotImplementedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
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
@Slf4j
public class ProductRepository implements JdbcRepository<Product> {
    private static final RowMapper<Product> ROW_MAPPER = (resultSet, i) -> {
        ProductType productType = ProductType.builder().prodTypeId(resultSet.getLong("prod_type_id")).name(resultSet.getString("t_name")).build();
        return Product.builder()
                      .productId(resultSet.getLong("product_id"))
                      .name(resultSet.getString("p_name"))
                      .energy(resultSet.getDouble("energy"))
                      .productType(productType)
                      .build();
    };
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ProductRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = Objects.requireNonNull(jdbcTemplate);
    }

    @Override
    public Optional<Product> findById(@Nonnull @NonNull Long id) {
        return JdbcRepository.getNullableResultIfException(() -> jdbcTemplate.queryForObject("select p.product_id, p.name as p_name, p.energy, t.name as t_name, t.prod_type_id " +
                                                                                      "from pp_app.product p, pp_app.prod_type t " +
                                                                                      "where p.product_id = ? and p.prod_type_id = t.prod_type_id", ROW_MAPPER, id));
    }

    @Override
    public Optional<Product> findByUniqueField(@NotBlank String fieldValue) {
        return JdbcRepository.getNullableResultIfException(() -> jdbcTemplate.queryForObject("select p.product_id, p.name as p_name, p.energy, t.name as t_name, t.prod_type_id " +
                                                                                      "from pp_app.product p, pp_app.prod_type t " +
                                                                                      "where p.name = ? and p.prod_type_id = t.prod_type_id", ROW_MAPPER, fieldValue.toUpperCase()));
    }

    @Override
    public Optional<Product> findByCustomQuery(@NotBlank String query) {
        return JdbcRepository.getNullableResultIfException(() -> jdbcTemplate.queryForObject(query, ROW_MAPPER));
    }

    @Override
    public Optional<Product> create(@Nonnull @NonNull Product entity) {
        jdbcTemplate.update("insert into pp_app.product (energy, name, prod_type_id) values (?,?,?)", entity.getEnergy(), entity.getName().toUpperCase().toUpperCase(), entity.getProductType().getProdTypeId());
        return findByUniqueField(entity.getName().toUpperCase());
    }

    @Override
    public Optional<Product> update(@Nonnull @NonNull Product entity) {
        jdbcTemplate.update("update pp_app.product set energy= ?, name=?, prod_type_id=? where product_id=?", entity.getEnergy(), entity.getName().toUpperCase(), entity.getProductType().getProdTypeId(), entity.getProductId());
        return findByUniqueField(entity.getName().toUpperCase());
    }

    @Override
    public void delete(@Nonnull @NonNull Product entity) {
        deleteById(entity.getProductId());
    }

    @Override
    public void deleteById(@Nonnull @NonNull Long id) {
        jdbcTemplate.update("delete from pp_app.product where product_id=?", id);
    }

    @Override
    public boolean isExistsId(@Nonnull @NonNull Long id) {
        long numberOfRows = jdbcTemplate.queryForObject("select count(product_id) from pp_app.product where product_id = ?;", (rs, rowNum) -> rs.getLong(1), id);
        return numberOfRows > 0;
    }

    @Override
    public boolean isExists(@Nonnull @NonNull Product entity) {
        return findByUniqueField(entity.getName().toUpperCase()).isPresent();
    }

    @Override
    public void createAll(Iterable<Product> entities) {
        final int batchSize = 100;
        List<List<Product>> batchLists = Lists.partition(Lists.newArrayList(entities), batchSize);
        for (List<Product> batch : batchLists) {
            jdbcTemplate.batchUpdate("insert into pp_app.product (energy, name, prod_type_id) values (?,?,?)", new BatchPreparedStatementSetter() {
                @Override
                public void setValues(PreparedStatement ps, int i)
                        throws SQLException {
                    Product product = batch.get(i);
                    ps.setDouble(1, product.getEnergy());
                    ps.setString(2, product.getName().toUpperCase());
                    ps.setLong(3, product.getProductType().getProdTypeId());
                }

                @Override
                public int getBatchSize() {
                    return batch.size();
                }
            });
        }
    }

    @Override
    public List<Product> findAll() {
        return jdbcTemplate.query("select p.product_id, p.name as p_name, p.energy, t.name as t_name, t.prod_type_id " +
                                                        "from pp_app.product p, pp_app.prod_type t " +
                                                        "where p.prod_type_id = t.prod_type_id", ROW_MAPPER);
    }

    @Override
    public List<Product> findAllByCustomQuery(@NotBlank String query) {
        throw new NotImplementedException("findAllByCustomQuery is not implemented yet");
    }

    public Page<Product> findAllByPage(Pageable pageable) {
        String querySql = "select p.product_id, p.name as p_name, p.energy, t.name as t_name, t.prod_type_id " +
                "from pp_app.product p, pp_app.prod_type t " +
                "where p.prod_type_id = t.prod_type_id " +
                "limit " + pageable.getPageSize() + " " +
                "offset " + pageable.getOffset();
        return getProducts(pageable, querySql);
    }

    private Page<Product> getProducts(Pageable pageable, String querySql) {
        List<Product> demos = jdbcTemplate.query(querySql, ROW_MAPPER);
        return new PageImpl<>(demos, pageable, getTotal());
    }

    private int getTotal() {
        String countQuery = "select count(1) as row_count from pp_app.product p, pp_app.prod_type t where p.prod_type_id = t.prod_type_id";
        return jdbcTemplate.queryForObject(countQuery, (rs, rowNum) -> rs.getInt(1));
    }

    public Page<Product> findAllByNameIsContaining(Pageable pageable, String name){
        String querySql = "select p.product_id, p.name as p_name, p.energy, t.name as t_name, t.prod_type_id " +
                "from pp_app.product p, pp_app.prod_type t " +
                "where p.prod_type_id = t.prod_type_id and p.name like '%"+ name.toUpperCase() +"%' " +
                "limit " + pageable.getPageSize() + " " +
                "offset " + pageable.getOffset();
        List<Product> demos = jdbcTemplate.query(querySql, ROW_MAPPER);
        String countQuery = "select count(1) as row_count from pp_app.product p, pp_app.prod_type t where p.prod_type_id = t.prod_type_id and p.name like '%"+ name +"%' ";
        int total = jdbcTemplate.queryForObject(countQuery, (rs, rowNum) -> rs.getInt(1));

        return new PageImpl<>(demos, pageable, total);
    }
    public Page<Product> findAllByProductType(Pageable pageable, Long id){
        String countQuery = "select count(1) as row_count from pp_app.product p, pp_app.prod_type t where p.prod_type_id = t.prod_type_id and p.prod_type_id = ?";
        int total = jdbcTemplate.queryForObject(countQuery, (rs, rowNum) -> rs.getInt(1), id);
        String querySql = "select p.product_id, p.name as p_name, p.energy, t.name as t_name, t.prod_type_id " +
                "from pp_app.product p, pp_app.prod_type t " +
                "where p.prod_type_id = t.prod_type_id and p.prod_type_id = ? " +
                "limit " + pageable.getPageSize() + " " +
                "offset " + pageable.getOffset();
        List<Product> demos = jdbcTemplate.query(querySql, ROW_MAPPER, id);
        return new PageImpl<>(demos, pageable, total);
    }
    public Page<Product> findAllByNameIsContainingAndProductType(Pageable pageable, String name, Long id){
        String countQuery = "select count(1) as row_count " +
                "from pp_app.product p, pp_app.prod_type t " +
                "where p.prod_type_id = t.prod_type_id and p.prod_type_id = ? and p.name like '%"+ name.toUpperCase() +"%'";
        int total = jdbcTemplate.queryForObject(countQuery, (rs, rowNum) -> rs.getInt(1), id);

        String querySql = "select p.product_id, p.name as p_name, p.energy, t.name as t_name, t.prod_type_id " +

                "from pp_app.product p, pp_app.prod_type t " +

                "where p.prod_type_id = t.prod_type_id and p.prod_type_id = ? and p.name like '%"+ name.toUpperCase() +"%' " +

                "limit " + pageable.getPageSize() + " " +
                "offset " + pageable.getOffset();
        List<Product> demos = jdbcTemplate.query(querySql, ROW_MAPPER, id);
        return new PageImpl<>(demos, pageable, total);
    }
}
