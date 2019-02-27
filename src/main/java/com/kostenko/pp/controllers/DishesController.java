package com.kostenko.pp.controllers;

import com.kostenko.pp.data.services.DishCrudService;
import com.kostenko.pp.data.views.Dish;
import com.kostenko.pp.json.entities.JsonDishEntity;
import com.kostenko.pp.services.page.ResultPage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@Slf4j
public class DishesController {
    private final DishCrudService dishCrudService;

    @Autowired
    public DishesController(DishCrudService dishCrudService) {
        this.dishCrudService = Objects.requireNonNull(dishCrudService);
    }

    @GetMapping("/dishes")
    public ResultPage<JsonDishEntity> getDishes(@RequestParam(value = "name", required = false) String name,
                                                @RequestParam(value = "page", required = false) Integer pageNumber,
                                                @RequestParam(value = "numberOfRecords", required = false) Integer numberOfRecords) {
//        Map<String, String> params = new HashMap<>();
//        params.put(PageInfo.SEARCH_STRING, name);
//        PageInfo pageInfo = PageInfo.createPageInfo(pageNumber, numberOfRecords, params);
//        Page<Dish> page = dishDBService.getAll(pageInfo);
        List<JsonDishEntity> collect = dishCrudService.findAll().stream().filter(dish -> dish.getName().contains(name)).map(JsonDishEntity::mapFromDish).collect(Collectors.toList());

        return new ResultPage<>(0, 1, collect);
    }

    @PostMapping("/dishes")
    @ResponseBody
    public Dish createProduct(@RequestBody JsonDishEntity jsonDish) {
        Dish dishFromJson = jsonDish.mapToDish();
        return dishCrudService.create(dishFromJson);
    }

    @PutMapping("/dishes/{id}")
    @ResponseBody
    public Dish updateProduct(@PathVariable Long id, @RequestBody JsonDishEntity dish) {
        if (id.equals(dish.getDishId())) {
            return dishCrudService.update(dish.mapToDish());
        } else {
            throw new IllegalArgumentException("Id from path and in object are different");
        }
    }

    @DeleteMapping("/dishes/{id}")
    public ResponseEntity deleteProduct(@PathVariable Long id) {
        dishCrudService.delete(id);
        return ResponseEntity.ok("Removed");
    }
}
