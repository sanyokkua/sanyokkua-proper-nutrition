package com.kostenko.pp.controllers.administrative;

import com.kostenko.pp.data.services.implementation.UserService;
import com.kostenko.pp.security.PasswordEncoder;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class LoginController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public LoginController(@NonNull UserService userService, @NonNull PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }
}
