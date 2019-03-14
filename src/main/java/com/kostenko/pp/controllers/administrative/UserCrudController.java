package com.kostenko.pp.controllers.administrative;

import com.kostenko.pp.controllers.extensions.RestCrudController;
import com.kostenko.pp.data.PageableSearch;
import com.kostenko.pp.data.pojos.User;
import com.kostenko.pp.data.services.implementation.RoleService;
import com.kostenko.pp.data.services.implementation.UserService;
import com.kostenko.pp.presentation.ResultPage;
import com.kostenko.pp.presentation.json.pojos.JsonRole;
import com.kostenko.pp.presentation.json.pojos.JsonUser;
import com.kostenko.pp.security.PasswordEncoder;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.kostenko.pp.data.services.implementation.UserService.*;
import static java.util.Objects.nonNull;

@Slf4j
@RestController
public class UserCrudController implements RestCrudController<JsonUser, AdminUserParams> {
    private final UserService userService;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserCrudController(@Nonnull @NonNull UserService userService, @NonNull @Nonnull RoleService roleService, @NonNull PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/users")
    @Override
    public ResultPage<JsonUser> findAll(AdminUserParams params) {
        PageableSearch.SearchParams<User> searchParams = new PageableSearch.SearchParams<>();
        searchParams.add(EMAIL, params.getSearchString(), true)
                    .add(RECORDS, params.getRecordsPerPage(), true)
                    .add(PAGE, params.getPage(), true)
                    .add(ROLE, params.getRoleId(), true);
        Page<User> page = userService.findAll(searchParams);

        return ResultPage.getResultPage(page, JsonUser::mapToJsonUser);
    }

    @PostMapping("/users")
    @ResponseBody
    @Nullable
    @Override
    public JsonUser create(@RequestBody @Nonnull @NonNull JsonUser jsonEntity) {
        log.info("Creating user: {}", jsonEntity.toString());
        User entityForCreation = jsonEntity.mapToUser();
        entityForCreation.setPassword(passwordEncoder.encode(entityForCreation.getPassword()));
        User user = userService.create(entityForCreation);
        if (nonNull(user)) {
            log.info("Created user: {}", user.toString());
            return JsonUser.mapToJsonUser(user);
        }
        return null;
    }

    @PutMapping("/users/{id}")
    @ResponseBody
    @Nullable
    @Override
    public JsonUser update(@PathVariable @Nonnull @NonNull Long id, @RequestBody JsonUser jsonEntity) {
        log.info("Updating user: {}", jsonEntity.toString());
        User fromDB = userService.findByField(jsonEntity.getEmail());
        if (Objects.isNull(fromDB)) {
            return null;
        }
        User entityForUpdating = jsonEntity.mapToUser();
        fromDB.update(entityForUpdating);
        if (StringUtils.isNotBlank(jsonEntity.getPassword())) {
            entityForUpdating.setPassword(passwordEncoder.encode(entityForUpdating.getPassword()));
        }
        User user = userService.update(entityForUpdating);
        if (nonNull(user)) {
            log.info("Updated user: {}", user.toString());
            return JsonUser.mapToJsonUser(user);
        }
        return null;
    }

    @DeleteMapping("/users/{id}")
    @Override
    public ResponseEntity delete(@PathVariable @Nonnull @NonNull Long id) {
        userService.delete(id);
        return ResponseEntity.ok("Removed");
    }

    @GetMapping("/roles")
    public List<JsonRole> getRoles() {
        return roleService.findAll().stream().map(JsonRole::mapFrom).collect(Collectors.toList());
    }

}
