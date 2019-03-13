package com.kostenko.pp.security;

public enum Permissions {
    ADMIN(0), MANAGER(1), USER(2), ANONYMOUS(3);
    private final int permissionId;

    Permissions(int permissionId) {
        this.permissionId = permissionId;
    }

    public int getPermissionId() {
        return this.permissionId;
    }
}
