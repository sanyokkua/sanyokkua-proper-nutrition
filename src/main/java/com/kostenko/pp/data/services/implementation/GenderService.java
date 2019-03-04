package com.kostenko.pp.data.services.implementation;

import com.kostenko.pp.data.pojos.Gender;
import com.kostenko.pp.data.repositories.jdbc.GenderRepository;
import com.kostenko.pp.data.services.DBService;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
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
        log.info("Looking for gender with id: {}", id);
        Gender gender = genderRepository.find(id);
        log.info("Found gender for id = {} -> {}", id, gender);
        return gender;
    }

    @Override
    public Gender findByField(@Nonnull @NonNull @NotBlank String field) {
        log.info("Looking for gender with name: {}", field);
        Gender gender = genderRepository.findByField(field);
        log.info("Found gender for name = {} -> {}", field, gender);
        return null;
    }

    @Override
    public Gender create(@Nonnull @NonNull Gender entity) {
        if (StringUtils.isBlank(entity.getGenderName())) {
            throw new IllegalArgumentException("Gender name is blank. With blank field entity can't be created");
        }
        if (isExists(entity)) {
            throw new IllegalArgumentException("Gender with name: " + entity.getGenderName() + " already exists");
        }
        return genderRepository.create(entity);
    }

    @Override
    public Gender update(@Nonnull @NonNull Gender entity) {
        if (entity.getGenderId() == null && StringUtils.isBlank(entity.getGenderName())) {
            throw new IllegalArgumentException("Gender id or name is null. Gender can't be updated. Gender = " + entity);
        }
        if (!isExists(entity)) {
            throw new IllegalArgumentException("Gender with name: " + entity.getGenderName() + " is not exists");
        }
        return genderRepository.update(entity);
    }

    @Override
    public void delete(@Nonnull @NonNull Long id) {
        log.info("Deleting gender with id = {}", id);
        boolean isDeleted = genderRepository.delete(id);
        log.info("Gender with id = {} is deleted: {}", id, isDeleted);
    }

    @Override
    public List<Gender> findAll() {
        return genderRepository.findAll();
    }

    @Override
    public boolean isExists(@Nonnull @NonNull Gender entity) {
        return genderRepository.isExists(entity);

    }
}
