package com.kostenko.pp.data.repositories.jdbc;

import com.google.common.collect.Lists;
import com.kostenko.pp.data.pojos.Dish;
import com.kostenko.pp.data.pojos.Product;
import com.kostenko.pp.data.repositories.CrudRepository;
import com.kostenko.pp.data.repositories.ExtendedSearch;
import com.kostenko.pp.data.repositories.SearchBuilder;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import javax.annotation.Nonnull;
import java.util.List;
import java.util.Optional;

import static java.util.Objects.isNull;

@Slf4j
@Repository
public class UserDishesRepository implements ExtendedSearch<Dish, SearchBuilder<Dish>> {
    private static final RowMapper<Product> ROW_MAPPER_FOR_PRODUCT = (resultSet, i) -> Product.builder()
                                                                                              .productId(resultSet.getLong("product_id"))
                                                                                              .productName(resultSet.getString("name"))
                                                                                              .productEnergy(resultSet.getDouble("energy"))
                                                                                              .productAmount(resultSet.getLong("amount"))
                                                                                              .prodTypeId(resultSet.getLong("prod_type_id"))
                                                                                              .prodTypeName(resultSet.getString("prod_type"))
                                                                                              .build();
    private final JdbcTemplate jdbcTemplate;
    private final RowMapper<Dish> ROW_MAPPER_FOR_DISH_WITH_PRODUCTS = (resultSet, i) -> {
        Dish dish = Dish.builder().dishId(resultSet.getLong("dish_id")).dishName(resultSet.getString("name")).build();
        Optional<List<Product>> allProductsForDish = findAllProductsForDish(dish.getDishId());
        List<Product> products = allProductsForDish.orElse(Lists.newArrayList());
        dish.setDishProducts(products);
        dish.setDishEnergy(products.stream().filter(product -> product.getProductAmount() > 0).map(product -> product.getProductEnergy() * (((double) product.getProductAmount()) / 100d)).reduce(Double::sum).orElse(0d));
        return dish;
    };

    @Autowired
    public UserDishesRepository(@NonNull @Nonnull JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void addDishToUser(@Nonnull @NonNull Long dishId, @Nonnull @NonNull Long userId) {
        log.info("Adding dish with id {} to user with id {}", dishId, userId);
        String createDishSql = "insert into pp_app.user_dishes (user_id, dish_id) values (?,?)";
        int updated = jdbcTemplate.update(createDishSql, userId, dishId);
        log.info("Added records to table user_dishes: {}", updated);
    }

    public void removeDishFromUser(@Nonnull @NonNull Long dishId, @Nonnull @NonNull Long userId) {
        log.info("Removing dish with id {} from user with id {}", dishId, userId);
        String removeDishFromUserSql = "delete from pp_app.user_dishes where user_id=? and dish_id = ?";
        int updated = jdbcTemplate.update(removeDishFromUserSql, userId, dishId);
        log.info("Removed records from table user_dishes: {}", updated);
    }

    public boolean isDishExistsInUserList(@Nonnull @NonNull Long dishId, @Nonnull @NonNull Long userId) {
        String sql = "select count(dish_id) from pp_app.user_dishes where user_id = ? and dish_id = ?";
        long numberOfRows = jdbcTemplate.queryForObject(sql, (rs, rowNum) -> rs.getLong(1), userId, dishId);
        return numberOfRows > 0;
    }

    private Optional<List<Product>> findAllProductsForDish(@Nonnull @NonNull Long id) {
        String findAllProductsForDishSql = "select dp.dish_dish_id as dish_id, dp.product_product_id as product_id, dp.amount, p.name, p.energy, pt.name as prod_type, pt.prod_type_id " +
                "from pp_app.dish_products dp, pp_app.product p, pp_app.prod_type pt " +
                "where dp.dish_dish_id = ? and p.product_id = dp.product_product_id and p.prod_type_id = pt.prod_type_id";
        return CrudRepository.getNullableResultIfException(() -> jdbcTemplate.query(findAllProductsForDishSql, ROW_MAPPER_FOR_PRODUCT, id));
    }

    @Override
    public UserDishSearchBuilder findByPages() {
        return new UserDishSearchBuilder();
    }

    public class UserDishSearchBuilder implements SearchBuilder<Dish> {
        private final String select = "select d.dish_id, d.name ";
        private final String from = "from pp_app.dish d, pp_app.appuser u ";
        private String where = null;
        private Pageable pageable;

        @Override
        public UserDishSearchBuilder begin(@Nonnull @NonNull Pageable pageable) {
            this.pageable = pageable;
            return this;
        }

        @Override
        public Page<Dish> invoke() {
            if (isNull(pageable)) {
                throw new IllegalArgumentException("Pageable is null. You should call begin method with not null pageable");
            }
            String whereClause = !isNull(where) ? where : "";
            String countQuery = "select count(1) as row_count " + from + whereClause;
            int total = jdbcTemplate.queryForObject(countQuery, (rs, rowNum) -> rs.getInt(1));

            String querySql = select + from + whereClause + " limit " + pageable.getPageSize() + " offset " + pageable.getOffset();
            List<Dish> dishes = jdbcTemplate.query(querySql, ROW_MAPPER_FOR_DISH_WITH_PRODUCTS);
            return new PageImpl<>(dishes, pageable, total);
        }

        public UserDishSearchBuilder addUser(Long userId) {
            if (!isNull(userId) && userId >= 0) {
                if (StringUtils.isBlank(where)) {
                    where = "where u.user_id = " + userId + " ";
                } else {
                    where += " and u.user_id = " + userId + " ";
                }
            }
            return this;
        }

        public UserDishSearchBuilder addDishName(String name) {
            if (StringUtils.isNotBlank(name)) {
                String like = String.format("'%%%s%%'", name.toUpperCase());
                if (StringUtils.isBlank(where)) {
                    where = "where d.name like  = " + like + " ";
                } else {
                    where += " and d.name like " + like + " ";
                }
            }
            return this;
        }
    }
}
