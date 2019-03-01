package com.kostenko.pp.controllers.food;

import com.kostenko.pp.data.PageableSearch;
import com.kostenko.pp.data.pojos.Dish;
import com.kostenko.pp.data.services.implementation.DishService;
import com.kostenko.pp.presentation.ResultPage;
import com.kostenko.pp.presentation.json.pojos.JsonDish;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@Slf4j
public class DishesController {
    private final DishService dishService;

    @Autowired
    public DishesController(DishService dishService) {
        this.dishService = Objects.requireNonNull(dishService);
    }

    @GetMapping("/dishes")
    public ResultPage<JsonDish> getDishes(@RequestParam(value = "name", required = false) String name,
                                          @RequestParam(value = "page", required = false) Integer pageNumber,
                                          @RequestParam(value = "numberOfRecords", required = false) Integer numberOfRecords) {
        PageableSearch.SearchParams<Dish> searchParams = new PageableSearch.SearchParams<>();
        searchParams.add(DishService.NAME, name, true);
        searchParams.add(DishService.RECORDS, numberOfRecords, true);
        searchParams.add(DishService.PAGE, pageNumber, true);
        Page<Dish> page = dishService.findAll(searchParams);
        return ResultPage.getResultPage(page, JsonDish::mapFromDish);
    }

    @PostMapping("/dishes")
    @ResponseBody
    public Dish createProduct(@RequestBody JsonDish jsonDish) {
        Dish dishFromJson = jsonDish.mapToDish();
        return dishService.create(dishFromJson);
    }

    @PutMapping("/dishes/{id}")
    @ResponseBody
    public Dish updateProduct(@PathVariable Long id, @RequestBody JsonDish dish) {
        if (id.equals(dish.getDishId())) {
            return dishService.update(dish.mapToDish());
        } else {
            throw new IllegalArgumentException("Id from path and in object are different");
        }
    }

    @DeleteMapping("/dishes/{id}")
    public ResponseEntity deleteProduct(@PathVariable Long id) {
        dishService.delete(id);
        return ResponseEntity.ok("Removed");
    }
}