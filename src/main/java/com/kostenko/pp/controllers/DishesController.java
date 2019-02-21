package com.kostenko.pp.controllers;

import com.kostenko.pp.data.repositories.jdbc.DishRepository;
import com.kostenko.pp.data.views.Dish;
import com.kostenko.pp.json.entities.JsonDishEntity;
import com.kostenko.pp.services.DBService;
import com.kostenko.pp.services.page.PageInfo;
import com.kostenko.pp.services.page.ResultPage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@Slf4j
public class DishesController {
    //    private final DBService<Dish> dishDBService;
    private final DishRepository dishRepository;

    @Autowired
    public DishesController(DishRepository dishRepository) {
//        this.dishDBService = Objects.requireNonNull(dishDBService, "Instead of DishesDBService instance injected null");
        this.dishRepository = Objects.requireNonNull(dishRepository);
    }

    @GetMapping("/dishes")
    public ResultPage<JsonDishEntity> getDishes(@RequestParam(value = "name", required = false) String name,
                                                @RequestParam(value = "page", required = false) Integer pageNumber,
                                                @RequestParam(value = "numberOfRecords", required = false) Integer numberOfRecords) {
//        Map<String, String> params = new HashMap<>();
//        params.put(PageInfo.SEARCH_STRING, name);
//        PageInfo pageInfo = PageInfo.createPageInfo(pageNumber, numberOfRecords, params);
//        Page<Dish> page = dishDBService.getAll(pageInfo);
        List<JsonDishEntity> collect = dishRepository.findAll().stream().filter(dish -> dish.getName().contains(name)).map(JsonDishEntity::mapFromDish).collect(Collectors.toList());

        return new ResultPage<>(0, 1, collect);
    }

    @PostMapping("/dishes")
    @ResponseBody
    public Dish createProduct(@RequestBody JsonDishEntity jsonDish) {
        Dish dishFromJson = jsonDish.mapToDish();
        return dishRepository.create(dishFromJson).orElse(null);
    }

    @PutMapping("/dishes/{id}")
    @ResponseBody
    public Dish updateProduct(@PathVariable Long id, @RequestBody JsonDishEntity dish) {
        if (id.equals(dish.getDishId())) {
            return dishRepository.update(dish.mapToDish()).orElse(null);
        } else {
            throw new IllegalArgumentException("Id from path and in object are different");
        }
    }

    @DeleteMapping("/dishes/{id}")
    public ResponseEntity deleteProduct(@PathVariable Long id) {
        dishRepository.deleteById(id);
        return ResponseEntity.ok("Removed");
    }
}
