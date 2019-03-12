package com.kostenko.pp.controllers.administrative;

import com.kostenko.pp.data.pojos.User;
import com.kostenko.pp.data.services.implementation.UserService;
import com.kostenko.pp.security.PasswordEncoder;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import java.util.Objects;

@Slf4j
@Controller
public class LoginController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public LoginController(@Nonnull @NonNull UserService userService, @Nonnull @NonNull PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login2")
    @ResponseBody
    @Nullable
    public ResponseEntity login(@RequestParam(value = "email") @Nonnull @NonNull String email, @RequestParam(value = "password") @Nonnull @NonNull String password) {
        if (StringUtils.isBlank(email)) {
            return ResponseEntity.badRequest().body("Email is blank");
            //throw new IllegalArgumentException("Email is blank");
        }
        if (StringUtils.isBlank(password)) {
            return ResponseEntity.badRequest().body("Password is blank");
            //throw new IllegalArgumentException("Password is blank");
        }
        User fromDb = userService.findByField(email);
        if (Objects.isNull(fromDb)) {
            return ResponseEntity.badRequest().body("User with email: " + email + " is not exists");
            //throw new IllegalArgumentException("User with email: " + email + " is not exists");
        }
        String userPassword = fromDb.getPassword();
        boolean matching = passwordEncoder.isMatching(password, userPassword);
        if (!matching) {
            return ResponseEntity.badRequest().body("Password is not matching");
            //throw new IllegalArgumentException("Password is not matching");
        }
        return ResponseEntity.ok(fromDb.getUserId());
    }
}
