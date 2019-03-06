package com.kostenko.pp.controllers.administrative;

import com.kostenko.pp.data.services.implementation.UserService;
import com.kostenko.pp.security.PasswordEncoder;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import javax.annotation.Nonnull;

@Controller
public class LoginController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public LoginController(@Nonnull @NonNull UserService userService, @Nonnull @NonNull PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }
}
