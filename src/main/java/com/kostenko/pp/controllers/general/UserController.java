package com.kostenko.pp.controllers.general;

import com.kostenko.pp.data.PageableSearch;
import com.kostenko.pp.data.pojos.Dish;
import com.kostenko.pp.data.pojos.User;
import com.kostenko.pp.data.services.implementation.DishService;
import com.kostenko.pp.data.services.implementation.UserDishService;
import com.kostenko.pp.data.services.implementation.UserService;
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

import static com.kostenko.pp.data.services.implementation.UserDishService.*;
import static java.util.Objects.nonNull;

@Slf4j
@RestController
public class UserController {
    private final UserService userService;
    private final DishService dishService;
    private final UserDishService userDishService;

    @Autowired
    public UserController(@Nonnull @NonNull UserService userService, @NonNull @Nonnull DishService dishService, @Nonnull @NonNull UserDishService userDishService) {
        this.userService = userService;
        this.dishService = dishService;
        this.userDishService = userDishService;
    }

    @GetMapping("/user/dishes")
    public ResultPage<JsonDish> getDishes(UserParam params) {
        Long userId = params.getUserId();
        PageableSearch.SearchParams<User> searchParams = new PageableSearch.SearchParams<>();
        searchParams.add(SEARCH, params.getSearchString(), true)
                    .add(RECORDS, params.getRecordsPerPage(), true)
                    .add(PAGE, params.getPage(), true)
                    .add(USER, nonNull(userId) ? userId : null, false);
        Page<Dish> page = userDishService.findAll(searchParams);
        return ResultPage.getResultPage(page, JsonDish::mapFromDish);
    }

    @PostMapping("/user/dishes")
    public ResponseEntity addDishToUser(@RequestBody @NonNull @Nonnull DishAddParam param) {
        Dish dish = dishService.findById(param.getDishId());
        if (Objects.isNull(dish)) {
            return ResponseEntity.badRequest().body("Dish is not exists. Dish id: " + param.getDishId());
        }
        User user = userService.findById(param.getUserId());
        if (Objects.isNull(user)) {
            return ResponseEntity.badRequest().body("User is not exists. User id: " + param.getUserId());
        }
        userDishService.create(dish.getDishId(), user.getUserId());
        return ResponseEntity.ok("Added");
    }

    @DeleteMapping("/user/dishes")
    public ResponseEntity deleteDishFromUser(@RequestBody @NonNull @Nonnull DishAddParam param) {
        Dish dish = dishService.findById(param.getDishId());
        if (Objects.isNull(dish)) {
            return ResponseEntity.badRequest().body("Dish is not exists. Dish id: " + param.getDishId());
        }
        User user = userService.findById(param.getUserId());
        if (Objects.isNull(user)) {
            return ResponseEntity.badRequest().body("User is not exists. User id: " + param.getUserId());
        }
        userDishService.delete(dish.getDishId(), user.getUserId());
        return ResponseEntity.ok("Deleted");
    }
}
