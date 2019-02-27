package com.kostenko.pp.configuration;

import com.kostenko.pp.data.repositories.users.RoleRepository;
import com.kostenko.pp.data.repositories.users.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
@PropertySource(value = "classpath:general.properties")
@Slf4j
public class StartupCommandLineRunner implements CommandLineRunner {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
//    @Value("${admin.user.login}")
//    public String adminUserLogin;
//    @Value("${admin.user.pass}")
//    public String adminUserPass;
//    @Value("${admin.user.email}")
//    public String adminUserEmail;

    @Autowired
    public StartupCommandLineRunner(RoleRepository roleRepository, UserRepository userRepository) {
        this.roleRepository = Objects.requireNonNull(roleRepository, "Instead of RoleRepository instance injected null");
        this.userRepository = Objects.requireNonNull(userRepository, "Instead of UserRepository instance injected null");
    }

    @Override
    public void run(String... args) {
//        UserRoles.getAllRoles().stream()
//                 .map(userRoles -> new Role(userRoles.getId(), userRoles.getRoleName()))
//                 .filter(role -> !roleRepository.findById(role.getId()).isPresent())
//                 .forEach(roleRepository::save);
//        User admin = new User.UserBuilder()
//                .setId(0)
//                .setLogin(adminUserLogin)
//                .setPassword(adminUserPass)
//                .setEmail(adminUserEmail)
//                .build();
//        User byLogin = userRepository.findByLogin(adminUserLogin);
//        User byEmail = userRepository.findByEmail(adminUserEmail);
//        log.debug("Created user: ", admin.toString());
//        if (Objects.nonNull(byLogin) && Objects.nonNull(byEmail) && !byLogin.equals(byEmail)) {
//            log.error("Default admin user is already exists and login or email is not equal to them from properties");
//        } else if (Objects.isNull(byLogin) && Objects.isNull(byEmail)) {
//            userRepository.save(admin);
//            log.info("Created default admin user");
//        }
    }
}
