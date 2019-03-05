package com.kostenko.pp.configuration;

import lombok.NonNull;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum UserGenders {
    MALE("male"), FEMALE("female");
    private final String genderName;

    UserGenders(@NonNull String genderName) {
        this.genderName = genderName;
    }

    public static List<UserGenders> getAllGenders() {
        return Stream.of(MALE, FEMALE).collect(Collectors.toList());
    }

    public String getGenderName() {
        return genderName;
    }
}
