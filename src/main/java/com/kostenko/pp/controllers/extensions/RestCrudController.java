package com.kostenko.pp.controllers.extensions;

import com.kostenko.pp.presentation.ResultPage;
import lombok.NonNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

public interface RestCrudController<T> {

    ResultPage<T> findAll(UserRequestParam params);

    T create(@NonNull T jsonEntity);

    T update(@NonNull Long id, @RequestBody T jsonEntity);

    ResponseEntity delete(@PathVariable @NonNull Long id);

}
