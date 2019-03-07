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
    private Integer age;
    private Integer height;
    private Integer weight;
    private Long genderId;
    private Long roleId;

    public static JsonUser mapToJsonUser(User user) {
        return JsonUser.builder().userId(user.getUserId())
                       .email(user.getEmail())
                       .age(user.getAge())
                       .height(user.getHeight())
                       .weight(user.getWeight())
                       .genderId(user.getGenderId())
                       .roleId(user.getRoleId())
                       .build();
    }

    public User mapToUser() {
        return User.builder().build();
    }
}
