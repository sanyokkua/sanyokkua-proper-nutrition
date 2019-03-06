package com.kostenko.pp.controllers.extensions;

import com.kostenko.pp.presentation.ResultPage;
import lombok.NonNull;
import org.springframework.http.ResponseEntity;

import javax.annotation.Nonnull;

public interface RestCrudController<T> {

    ResultPage<T> findAll(UserRequestParam params);

    T create(@Nonnull @NonNull T jsonEntity);

    T update(@Nonnull @NonNull Long id, T jsonEntity);

    ResponseEntity delete(@Nonnull @NonNull Long id);

}
