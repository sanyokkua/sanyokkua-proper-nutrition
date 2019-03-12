package com.kostenko.pp.controllers.food.dishes;

import com.kostenko.pp.controllers.extensions.RestCrudController;
import com.kostenko.pp.data.PageableSearch;
import com.kostenko.pp.data.pojos.Dish;
import com.kostenko.pp.data.services.implementation.DishService;
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

@RestController
@Slf4j
public class DishesController implements RestCrudController<JsonDish, DishParams> {
    private final DishService dishService;

    @Autowired
    public DishesController(DishService dishService) {
        this.dishService = Objects.requireNonNull(dishService);
    }

    @GetMapping("/dishes")
    @Override
    public ResultPage<JsonDish> findAll(DishParams params) {
        PageableSearch.SearchParams<Dish> searchParams = new PageableSearch.SearchParams<>();
        searchParams.add(DishService.NAME, params.getSearchString(), true)
                    .add(DishService.RECORDS, params.getRecordsPerPage(), true)
                    .add(DishService.PAGE, params.getPage(), true);
        Page<Dish> page = dishService.findAll(searchParams);
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
