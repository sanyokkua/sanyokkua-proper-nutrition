package com.kostenko.pp.configuration;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum UserRoles {
    ADMIN("admin"), MANAGER("manager"), USER("user");
    private final String roleName;

    UserRoles(String roleName) {
        this.roleName = Objects.requireNonNull(roleName);
    }

    public static List<UserRoles> getAllRoles() {
        return Stream.of(ADMIN, MANAGER, USER).collect(Collectors.toList());
    }

    public String getRoleName() {
        return roleName;
    }
}
