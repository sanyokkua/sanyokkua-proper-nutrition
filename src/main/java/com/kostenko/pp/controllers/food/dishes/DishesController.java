package com.kostenko.pp.controllers.food.dishes;

import com.kostenko.pp.controllers.extensions.RestCrudController;
import com.kostenko.pp.data.PageableSearch;
import com.kostenko.pp.data.pojos.Dish;
import com.kostenko.pp.data.services.implementation.DishService;
import com.kostenko.pp.data.services.implementation.UserDishService;
import com.kostenko.pp.presentation.ResultPage;
import com.kostenko.pp.presentation.json.pojos.JsonDish;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Nonnull;
import java.util.Objects;
import java.util.Set;

import static java.util.stream.Collectors.toSet;

@RestController
@Slf4j
public class DishesController implements RestCrudController<JsonDish, DishParams> {
    private final DishService dishService;
    private final UserDishService userDishService;

    @Autowired
    public DishesController(@NonNull DishService dishService, @NonNull UserDishService userDishService) {
        this.dishService = Objects.requireNonNull(dishService);
        this.userDishService = userDishService;
    }

    @GetMapping("/dishes")
    @Override
    public ResultPage<JsonDish> findAll(DishParams params) {
        Long userId = params.getUserId();
        PageableSearch.SearchParams<Dish> searchParams = new PageableSearch.SearchParams<>();
        searchParams.add(DishService.NAME, params.getSearchString(), true)
                    .add(DishService.RECORDS, params.getRecordsPerPage(), true)
                    .add(DishService.PAGE, params.getPage(), true)
                    .add(UserDishService.USER, userId, true);
        Page<Dish> page = dishService.findAll(searchParams);
        if (userId != null) { //TODO: Temporary code. Problem with logic. There is a situation when dishes on the page for user and for general will be different.
            Page<Dish> allUserDishes = userDishService.findAll(searchParams);
            Set<Long> ids = allUserDishes.getContent().stream().map(Dish::getDishId).collect(toSet());
            page.getContent().forEach(dish -> {
                boolean contains = ids.contains(dish.getDishId());
                dish.setInCurrentUser(contains);
            });
        }
        return ResultPage.getResultPage(page, JsonDish::mapFromDish);
    }

    @PostMapping("/dishes")
    @ResponseBody
    @Override
    public JsonDish create(@Nonnull @NonNull JsonDish jsonEntity) {
        Dish dishFromJson = jsonEntity.mapToDish();
        Dish dish = dishService.create(dishFromJson);
        return Objects.isNull(dish) ? null : JsonDish.mapFromDish(dish);
    }

    @PutMapping("/dishes/{id}")
    @ResponseBody
    @Override
    public JsonDish update(@PathVariable @Nonnull @NonNull Long id, JsonDish jsonEntity) {
        if (id.equals(jsonEntity.getDishId())) {
            Dish dish = dishService.update(jsonEntity.mapToDish());
            return Objects.isNull(dish) ? null : JsonDish.mapFromDish(dish);
        } else {
            throw new IllegalArgumentException("Id from path and in object are different");
        }
    }

    @DeleteMapping("/dishes/{id}")
    @Override
    public ResponseEntity delete(@PathVariable @Nonnull @NonNull Long id) {
        dishService.delete(id);
        return ResponseEntity.ok("Removed");
    }

}
