package com.kostenko.pp.configuration;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum UserRoles {
    ADMIN(0L, "admin"), MANAGER(1L, "manager"), USER(2L, "user");

    private final long id;
    private final String roleName;

    UserRoles(long id, String roleName) {
        this.id = id;
        this.roleName = Objects.requireNonNull(roleName);
    }

    public static List<UserRoles> getAllRoles() {
        return Stream.of(ADMIN, MANAGER, USER).collect(Collectors.toList());
    }

    public long getId() {
        return id;
    }

    public String getRoleName() {
        return roleName;
    }
}
