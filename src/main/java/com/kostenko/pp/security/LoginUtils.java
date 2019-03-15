package com.kostenko.pp.security;

import com.kostenko.pp.data.pojos.Role;
import com.kostenko.pp.data.services.implementation.RoleService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;

import javax.annotation.Nonnull;
import java.util.Objects;

@Component
public class LoginUtils {
    private final RoleService roleService;

    @Autowired
    public LoginUtils(@NonNull @Nonnull RoleService roleService) {this.roleService = roleService;}

    public Permissions getPermission(@PathVariable @NonNull @Nonnull Long roleId) {
        Role byId = roleService.findById(roleId);
        Permissions permission = Permissions.ANONYMOUS;
        if (!Objects.isNull(byId)) {
            switch (byId.getRoleName()) {
                case "ADMIN":
                    permission = Permissions.ADMIN;
                    break;
                case "MANAGER":
                    permission = Permissions.MANAGER;
                    break;
                case "USER":
                    permission = Permissions.USER;
                    break;
                default:
                    permission = Permissions.ANONYMOUS;
            }
        }
        return permission;
    }
}
