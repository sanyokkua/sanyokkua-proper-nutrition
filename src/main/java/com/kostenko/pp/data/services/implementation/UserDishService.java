package com.kostenko.pp.data.services.implementation;

import com.kostenko.pp.data.PageableSearch;
import com.kostenko.pp.data.pojos.Dish;
import com.kostenko.pp.data.pojos.User;
import com.kostenko.pp.data.repositories.jdbc.UserDishesRepository;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.annotation.Nonnull;

@Slf4j
@Service
public class UserDishService implements PageableSearch<Dish> {
    public static final String SEARCH = "search";
    public static final String PAGE = "page";
    public static final String RECORDS = "records";
    public static final String USER = "user";
    private final UserDishesRepository repository;

    @Autowired
    public UserDishService(@NonNull UserDishesRepository repository) {
        this.repository = repository;
    }

    public void create(@Nonnull @NonNull Dish dish, @Nonnull @NonNull User user) {
        if (!repository.isDishExistsInUserList(dish.getDishId(), user.getUserId())) {
            repository.addDishToUser(dish.getDishId(), user.getUserId());
        }
    }

    public void delete(@Nonnull @NonNull Dish dish, @Nonnull @NonNull User user) {
        if (repository.isDishExistsInUserList(dish.getDishId(), user.getUserId())) {
            repository.removeDishFromUser(dish.getDishId(), user.getUserId());
        }
    }

    @Override
    public Page<Dish> findAll(@Nonnull @NonNull SearchParams searchParams) {
        log.info("searching all records with options: {}", searchParams.toString());
        int pageNumber = getDbPageNumber(searchParams.getInt(PAGE));
        int recordsPerPage = getRecordsPerPage(searchParams.getInt(RECORDS));
        return repository.findByPages().begin(PageRequest.of(pageNumber, recordsPerPage))
                         .addDishName(searchParams.getString(SEARCH))
                         .addUser(searchParams.getLong(USER))
                         .invoke();
    }
}
