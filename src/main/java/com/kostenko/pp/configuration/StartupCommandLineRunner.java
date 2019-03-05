package com.kostenko.pp.configuration;

import com.kostenko.pp.data.pojos.Gender;
import com.kostenko.pp.data.pojos.Role;
import com.kostenko.pp.data.pojos.User;
import com.kostenko.pp.data.repositories.jdbc.GenderRepository;
import com.kostenko.pp.data.repositories.jdbc.RoleRepository;
import com.kostenko.pp.data.repositories.jdbc.UserRepository;
import com.kostenko.pp.security.PasswordEncoder;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import java.util.Objects;

import static java.util.Objects.isNull;

@Component
@PropertySource(value = "classpath:general.properties")
@Slf4j
public class StartupCommandLineRunner implements CommandLineRunner {
    private final RoleRepository roleRepository;
    private final GenderRepository genderRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    @Value("${admin.user.pass}")
    public String adminUserPass;
    @Value("${admin.user.email}")
    public String adminUserEmail;

    @Autowired
    public StartupCommandLineRunner(@NonNull RoleRepository roleRepository, @NonNull GenderRepository genderRepository, @NonNull UserRepository userRepository, @NonNull PasswordEncoder encoder) {
        this.roleRepository = roleRepository;
        this.genderRepository = genderRepository;
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    @Override
    public void run(String... args) {
        UserRoles.getAllRoles().stream()
                 .map(userRoles -> Role.builder().roleName(userRoles.getRoleName()).build())
                 .filter(role -> isNull(roleRepository.findByField(role.getRoleName())))
                 .forEach(roleRepository::create);
        UserGenders.getAllGenders().stream()
                   .map(userGender -> Gender.builder().genderName(userGender.getGenderName()).build())
                   .filter(gender -> isNull(genderRepository.findByField(gender.getGenderName())))
                   .forEach(genderRepository::create);
        Role adminRole = roleRepository.findByField(UserRoles.ADMIN.getRoleName());
        Gender adminGender = genderRepository.findByField(UserGenders.MALE.getGenderName());
        User admin = User.builder()
                         .password(encoder.encode(adminUserPass))
                         .email(adminUserEmail)
                         .roleId(adminRole.getRoleId())
                         .roleName(adminRole.getRoleName())
                         .genderId(adminGender.getGenderId())
                         .genderName(adminGender.getGenderName())
                         .build();
        User byEmail = userRepository.findByField(adminUserEmail);
        log.debug("Created user: ", admin.toString());
        if (Objects.nonNull(byEmail)) {
            log.error("Default admin user is already exists and login or email is not equal to them from properties");
        } else {
            userRepository.create(admin);
            log.info("Created default admin user");
        }
    }
}
