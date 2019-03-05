package com.kostenko.pp.presentation.json.pojos;

import com.kostenko.pp.data.pojos.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JsonUser {
    private Long userId;
    private String email;
    private String password;
    private Integer age;
    private Integer height;
    private Integer weight;
    private Long genderId;
    private String genderName;
    private Long roleId;
    private String roleName;

    public static JsonUser mapToJsonUser(User user) {
        return JsonUser.builder().build();
    }

    public User mapToUser() {
        return User.builder().build();
    }
}
