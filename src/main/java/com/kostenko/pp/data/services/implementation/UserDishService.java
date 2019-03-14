package com.kostenko.pp.data.services.implementation;

import com.kostenko.pp.data.PageableSearch;
import com.kostenko.pp.data.pojos.Dish;
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
    public UserDishService(@Nonnull @NonNull UserDishesRepository repository) {
        this.repository = repository;
    }

    public void create(@Nonnull @NonNull Long dishId, @Nonnull @NonNull Long userId) {
        if (!repository.isDishExistsInUserList(dishId, userId)) {
            repository.addDishToUser(dishId, userId);
        }
    }

    public void delete(@Nonnull @NonNull Long dishId, @Nonnull @NonNull Long userId) {
        if (repository.isDishExistsInUserList(dishId, userId)) {
            repository.removeDishFromUser(dishId, userId);
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
