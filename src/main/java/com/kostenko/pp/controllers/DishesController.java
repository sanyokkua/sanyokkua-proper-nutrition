package com.kostenko.pp.controllers;

import com.google.common.base.Preconditions;
import com.kostenko.pp.data.entity.Dish;
import com.kostenko.pp.json.JsonDish;
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
import java.util.Map;

@RestController
@Slf4j
public class DishesController {
    private final DBService<Dish> dishDBService;

    @Autowired
    public DishesController(@Qualifier("DishesDBService") DBService<Dish> dishDBService) {
        Preconditions.checkNotNull(dishDBService);
        this.dishDBService = dishDBService;
    }

    @GetMapping("/dishes")
    public ResultPage<JsonDish> getDishes(@RequestParam(value = "name", required = false) String name,
                                          @RequestParam(value = "page", required = false) Integer pageNumber,
                                          @RequestParam(value = "numberOfRecords", required = false) Integer numberOfRecords) {
        Map<String, String> params = new HashMap<>();
        params.put(PageInfo.SEARCH_STRING, name);
        PageInfo pageInfo = PageInfo.createPageInfo(pageNumber, numberOfRecords, params);
        Page<Dish> page = dishDBService.getAll(pageInfo);
        return ResultPage.getResultPage(page, JsonDish::mapFromDish);
    }

    @PostMapping("/dishes")
    @ResponseBody
    public Dish createProduct(@RequestBody JsonDish jsonDish) {
        Dish dishFromJson = jsonDish.mapToDish();
        return dishDBService.create(dishFromJson);
    }

    @PutMapping("/dishes/{id}")
    @ResponseBody
    public Dish updateProduct(@PathVariable Long id, @RequestBody JsonDish dish) {
        if (id.equals(dish.getId())) {
            Dish dishFromJson = dish.mapToDish();
            return dishDBService.update(dishFromJson);
        } else {
            throw new IllegalArgumentException("Id from path and in object are different");
        }
    }

    @DeleteMapping("/dishes/{id}")
    public ResponseEntity deleteProduct(@PathVariable Long id) {
        final Dish dishFromDb = dishDBService.findById(id);
        if (dishFromDb == null) {
            throw new IllegalArgumentException("Dish with id " + id + " doesn't exists. Delete can't be done");
        } else {
            dishDBService.delete(dishFromDb);
        }
        return ResponseEntity.ok(dishFromDb);
    }
}
