package com.kostenko.pp.data.repositories.jdbc;

import com.google.common.collect.Lists;
import com.kostenko.pp.data.repositories.CrudExtensions;
import com.kostenko.pp.data.repositories.CrudRepository;
import com.kostenko.pp.data.views.Dish;
import com.kostenko.pp.data.views.Product;
import lombok.NonNull;
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
import javax.annotation.Nullable;
import javax.transaction.Transactional;
import javax.validation.constraints.NotBlank;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Repository
@Transactional
public class DishRepository implements CrudRepository<Dish>, CrudExtensions<Dish> {
    private static final RowMapper<Dish> ROW_MAPPER_FOR_DISH = (resultSet, i) -> Dish.builder().dishId(resultSet.getLong("dish_id"))
                                                                                     .name(resultSet.getString("name"))
                                                                                     .build();
    private static final RowMapper<Product> ROW_MAPPER_FOR_PRODUCT = (resultSet, i) -> Product.builder()
                                                                                              .productId(resultSet.getLong("product_id"))
                                                                                              .name(resultSet.getString("name"))
                                                                                              .energy(resultSet.getDouble("energy"))
                                                                                              .amount(resultSet.getLong("amount"))
                                                                                              .prodTypeId(resultSet.getLong("prod_type_id"))
                                                                                              .typeName(resultSet.getString("prod_type"))
                                                                                              .build();
    private final JdbcTemplate jdbcTemplate;
    private final RowMapper<Dish> ROW_MAPPER_FOR_DISH_WITH_PRODUCTS = (resultSet, i) -> {
        Dish dish = Dish.builder().dishId(resultSet.getLong("dish_id")).name(resultSet.getString("name")).build();
        Optional<List<Product>> allProductsForDish = findAllProductsForDish(dish.getDishId());
        List<Product> products = allProductsForDish.orElse(Lists.newArrayList());
        dish.setProducts(products);
        dish.setTotalEnergy(products.stream().filter(product -> product.getAmount() > 0).map(product -> product.getEnergy() * (((double) product.getAmount()) / 100d)).reduce(Double::sum).orElse(0d));
        return dish;
    };

    @Autowired
    public DishRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = Objects.requireNonNull(jdbcTemplate);
    }

    @Nullable
    @Override
    public Dish create(@Nonnull @NonNull Dish entity) {
        String createDishSql = "insert into pp_app.dish (name) values (?)";
        jdbcTemplate.update(createDishSql, entity.getName().toUpperCase());
        createProductsForDish(entity);
        return findByField(entity.getName().toUpperCase());
    }

    @Nullable
    @Override
    public Dish update(@Nonnull @NonNull Dish entity) {
        String updateDishSql = "update pp_app.dish set name=? where dish_id=?";
        jdbcTemplate.update(updateDishSql, entity.getName().toUpperCase(), entity.getDishId());
        String removeDishProductsSql = "delete from pp_app.dish_products where dish_dish_id=?";
        jdbcTemplate.update(removeDishProductsSql, entity.getDishId());
        createProductsForDish(entity);
        return findByField((entity.getName().toUpperCase()));
    }

    @Override
    public boolean delete(@Nonnull @NonNull Long id) {
        String removeDishProductsSql = "delete from pp_app.dish_products where dish_dish_id=?";
        String removeDishSql = "delete from pp_app.dish where dish_id=?";
        jdbcTemplate.update(removeDishProductsSql, id);
        jdbcTemplate.update(removeDishSql, id);
        return true;
    }

    @Nullable
    @Override
    public Dish find(@Nonnull @NonNull Long id) {
        String findDishByIdSql = "select d.dish_id, d.name from pp_app.dish d where d.dish_id = ?";
        return queryForDish(findDishByIdSql, id).orElse(null);
    }

    @Override
    public List<Dish> findAll() {
        String findAllSql = "select d.dish_id, d.name from pp_app.dish d";
        Optional<List<Dish>> result = CrudRepository.getNullableResultIfException(() -> jdbcTemplate.query(findAllSql, ROW_MAPPER_FOR_DISH_WITH_PRODUCTS));
        return result.orElseGet(Lists::newArrayList);
    }

    private void createProductsForDish(@NonNull @Nonnull Dish entity) {
        Dish byUniqueField = findByField((entity.getName().toUpperCase()));
        if (byUniqueField != null) {
            List<Product> batchLists = entity.getProducts();
            String createProductsSql = "insert into pp_app.dish_products (amount, dish_dish_id, product_product_id) VALUES (?,?,?)";
            jdbcTemplate.batchUpdate(createProductsSql, new BatchPreparedStatementSetter() {
                @Override
                public void setValues(PreparedStatement ps, int i) throws SQLException {
                    Product product = batchLists.get(i);
                    ps.setLong(1, product.getAmount());
                    ps.setLong(2, byUniqueField.getDishId());
                    ps.setLong(3, product.getProductId());
                }

                @Override
                public int getBatchSize() {
                    return batchLists.size();
                }
            });
        }
    }

    @Override
    public void createAll(Iterable<Dish> entities) {
        throw new NotImplementedException("findAllByCustomQuery is not implemented yet");
    }

    @Override
    public boolean delete(@Nonnull @NonNull Dish entity) {
        return delete(entity.getDishId());
    }

    @Nullable
    @Override
    public Dish find(@Nonnull @NonNull Dish entity) {
        return null;
    }

    @Nullable
    @Override
    public Dish findByField(@NotBlank String fieldValue) {
        String findDishByIdSql = "select d.dish_id, d.name from pp_app.dish d where d.name = ?";
        return queryForDish(findDishByIdSql, fieldValue).orElse(null);
    }

    @Override
    public boolean isExistsId(@Nonnull @NonNull Long id) {
        return find(id) != null;
    }

    @Override
    public boolean isExists(@Nonnull @NonNull Dish entity) {
        return find(entity) != null;
    }

    private Optional<Dish> queryForDish(String findDishByIdSql, Object param) {
        Optional<Dish> dish = CrudRepository.getNullableResultIfException(() -> jdbcTemplate.queryForObject(findDishByIdSql, ROW_MAPPER_FOR_DISH, param));
        if (dish.isPresent()) {
            return makeDish(dish.get());
        }
        return Optional.empty();
    }

    private Optional<Dish> makeDish(Dish dish) {
        Optional<List<Product>> products = findAllProductsForDish(dish.getDishId());
        if (!products.isPresent()) {
            return Optional.empty();
        }
        List<Product> currentProducts = products.get();
        double reduce = currentProducts.stream().map(product -> product.getEnergy() * product.getAmount()).reduce((aDouble, aDouble2) -> aDouble + aDouble2).orElse(0D);
        dish.setProducts(currentProducts);
        dish.setTotalEnergy(reduce);
        return Optional.of(dish);
    }

    private Optional<List<Product>> findAllProductsForDish(@Nonnull @NonNull Long id) {
        String findAllProductsForDishSql = "select dp.dish_dish_id as dish_id, dp.product_product_id as product_id, dp.amount, p.name, p.energy, pt.name as prod_type, pt.prod_type_id " +
                "from pp_app.dish_products dp, pp_app.product p, pp_app.prod_type pt " +
                "where dp.dish_dish_id = ? and p.product_id = dp.product_product_id and p.prod_type_id = pt.prod_type_id";
        return CrudRepository.getNullableResultIfException(() -> jdbcTemplate.query(findAllProductsForDishSql, ROW_MAPPER_FOR_PRODUCT, id));
    }

    public Page<Dish> findAllByPage(Pageable pageable) {
        String countQuery = "select count(1) as row_count from pp_app.dish d";
        int total = jdbcTemplate.queryForObject(countQuery, (rs, rowNum) -> rs.getInt(1));

        String querySql = "select d.dish_id, d.name " +
                "from pp_app.dish d " +
                "limit " + pageable.getPageSize() + " " +
                "offset " + pageable.getOffset();

        List<Dish> dishes = jdbcTemplate.query(querySql, ROW_MAPPER_FOR_DISH_WITH_PRODUCTS);
        return new PageImpl<>(dishes, pageable, total);
    }

    public Page<Dish> findAllByPageAndName(Pageable pageable, String name) {
        String likeString = String.format("'%%%s%%'", name.toUpperCase());
        String countQuery = "select count(1) as row_count from pp_app.dish d where name like " + likeString;
        int total = jdbcTemplate.queryForObject(countQuery, (rs, rowNum) -> rs.getInt(1));

        String querySql = "select d.dish_id, d.name " +
                "from pp_app.dish d " +
                "where name like " + likeString + " " +
                "limit " + pageable.getPageSize() + " " +
                "offset " + pageable.getOffset();

        List<Dish> dishes = jdbcTemplate.query(querySql, ROW_MAPPER_FOR_DISH_WITH_PRODUCTS);
        return new PageImpl<>(dishes, pageable, total);
    }

}
