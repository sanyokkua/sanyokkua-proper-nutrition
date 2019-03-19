package com.kostenko.pp.configuration.security;

import com.kostenko.pp.data.pojos.Role;
import com.kostenko.pp.data.pojos.User;
import com.kostenko.pp.data.services.implementation.RoleService;
import com.kostenko.pp.data.services.implementation.UserService;
import lombok.NonNull;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class AppUserDetailsService implements UserDetailsService {//TODO:
    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AppUserDetailsService(@NonNull UserService userService, @NonNull RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @Override
    public UserDetails loadUserByUsername(@NonNull String email) throws UsernameNotFoundException {
        if (StringUtils.isBlank(email)) {
            throw new UsernameNotFoundException("Empty email");
        }
        User user = userService.findByField(email);
        if (Objects.isNull(user)) {
            throw new UsernameNotFoundException("User with " + email + " is not exists");
        }
        Role role = roleService.findById(user.getRoleId());
        if (Objects.isNull(role)) {
            throw new UsernameNotFoundException("Role is null for user with email: " + email);
        }
        return new AppUserDetails(user, role);
    }
}
