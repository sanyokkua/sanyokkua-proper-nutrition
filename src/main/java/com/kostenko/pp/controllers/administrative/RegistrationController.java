package com.kostenko.pp.controllers.administrative;

import com.kostenko.pp.data.pojos.User;
import com.kostenko.pp.data.services.implementation.UserService;
import com.kostenko.pp.presentation.json.pojos.JsonUser;
import com.kostenko.pp.security.LoginUtils;
import com.kostenko.pp.security.PasswordEncoder;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import java.util.Objects;

import static java.util.Objects.nonNull;

@Slf4j
@Controller
public class RegistrationController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final LoginUtils loginUtils;

    @Autowired
    public RegistrationController(@Nonnull @NonNull UserService userService, @Nonnull @NonNull PasswordEncoder passwordEncoder, @Nonnull @NonNull LoginUtils loginUtils) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.loginUtils = loginUtils;
    }

    @PostMapping("/registration")
    @ResponseBody
    @Nullable
    public JsonUser register(@RequestBody @Nonnull @NonNull JsonUser jsonEntity) {
        log.info("Registration user: {}", jsonEntity.toString());
        User entityForCreation = jsonEntity.mapToUser();
        entityForCreation.setPassword(passwordEncoder.encode(entityForCreation.getPassword()));
        User user = userService.create(entityForCreation);
        if (nonNull(user)) {
            log.info("Registered user: {}", user.toString());
            JsonUser jsonUser = JsonUser.mapToJsonUser(user);
            jsonUser.setPermissionsId(loginUtils.getPermission(user.getRoleId()).getPermissionId());
            return jsonUser;
        }
        return null;
    }

    @GetMapping("/email")
    @ResponseBody
    public boolean isEmailInUse(@RequestParam @NonNull @Nonnull String email) {
        if (StringUtils.isBlank(email)) {
            return false;
        }
        User user = userService.findByField(email);
        return Objects.nonNull(user);
    }
}
