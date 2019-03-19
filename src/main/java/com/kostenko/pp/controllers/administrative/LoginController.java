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
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;
import java.util.Objects;

@Slf4j
@Controller
public class LoginController {//TODO:
    private final UserService userService;
    private final LoginUtils loginUtils;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public LoginController(@Nonnull @NonNull UserService userService, @NonNull @Nonnull LoginUtils loginUtils, @Nonnull @NonNull @Qualifier(value = "passwordEncoderPbkdf") PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.loginUtils = loginUtils;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login2")
    @ResponseBody
    @Nullable
    public ResponseEntity login(@RequestBody @NonNull LoginParams params) {
        if (StringUtils.isBlank(params.getEmail())) {
            return ResponseEntity.badRequest().body("Email is blank");
            //throw new IllegalArgumentException("Email is blank");
        }
        if (StringUtils.isBlank(params.getPassword())) {
            return ResponseEntity.badRequest().body("Password is blank");
            //throw new IllegalArgumentException("Password is blank");
        }
        User fromDb = userService.findByField(params.getEmail());
        if (Objects.isNull(fromDb)) {
            return ResponseEntity.badRequest().body("User with email: " + params.getEmail() + " is not exists");
            //throw new IllegalArgumentException("User with email: " + email + " is not exists");
        }
        String userPassword = fromDb.getPassword();
        boolean matching = passwordEncoder.isMatching(params.getPassword(), userPassword);
        if (!matching) {
            return ResponseEntity.badRequest().body("Password is not matching");
            //throw new IllegalArgumentException("Password is not matching");
        }
        JsonUser jsonUser = JsonUser.mapToJsonUser(fromDb);
        jsonUser.setPermissionsId(loginUtils.getPermission(fromDb.getRoleId()).getPermissionId());
        return ResponseEntity.ok(jsonUser);
    }

//    @RequestMapping(value = "/login", method = RequestMethod.GET)
//    @ResponseBody
//    public String currentUserNameSimple(HttpServletRequest request) {
//        Principal principal = request.getUserPrincipal();
//        return principal.getName();
//    }
//
//    @RequestMapping(value="/logout", method=RequestMethod.GET)
//    public String logoutPage(HttpServletRequest request, HttpServletResponse response) {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        if (auth != null){
//            new SecurityContextLogoutHandler().logout(request, response, auth);
//        }
//        return "redirect:/";
//    }
}
