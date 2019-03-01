package com.kostenko.pp.data.services.implementation;

import com.kostenko.pp.data.pojos.Gender;
import com.kostenko.pp.data.repositories.jdbc.GenderRepository;
import com.kostenko.pp.data.services.DBService;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Nonnull;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Slf4j
@Service
public class GenderService implements DBService<Gender> {
    private final GenderRepository genderRepository;

    @Autowired
    public GenderService(@NonNull GenderRepository genderRepository) {
        this.genderRepository = genderRepository;
    }

    @Override
    public Gender findById(@Nonnull @NonNull Long id) {
        return null;
    }

    @Override
    public Gender findByField(@Nonnull @NonNull @NotBlank String field) {
        return null;
    }

    @Override
    public Gender create(@Nonnull @NonNull Gender entity) {
        return null;
    }

    @Override
    public Gender update(@Nonnull @NonNull Gender entity) {
        return null;
    }

    @Override
    public void delete(@Nonnull @NonNull Long id) {

    }

    @Override
    public List<Gender> findAll() {
        return null;
    }

    @Override
    public boolean isExists(@Nonnull @NonNull Gender entity) {
        return false;
    }
}
