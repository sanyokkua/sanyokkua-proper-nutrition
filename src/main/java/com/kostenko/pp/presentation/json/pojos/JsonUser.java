package com.kostenko.pp.presentation.json.pojos;

import com.kostenko.pp.data.pojos.User;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "password")
@Builder
public class JsonUser {
    private Long userId;
    private String email;
    private Integer age;
    private Integer height;
    private Integer weight;
    private Long genderId;
    private Long roleId;
    private String password;

    public static JsonUser mapToJsonUser(User user) {
        return JsonUser.builder()
                       .userId(user.getUserId())
                       .email(user.getEmail())
                       .age(user.getAge())
                       .height(user.getHeight())
                       .weight(user.getWeight())
                       .genderId(user.getGenderId())
                       .roleId(user.getRoleId())
                       .password("")
                       .build();
    }

    public User mapToUser() {
        return User.builder()
                   .userId(userId)
                   .email(email)
                   .age(age)
                   .weight(weight)
                   .height(height)
                   .genderId(genderId)
                   .roleId(roleId)
                   .password(password)
                   .build();
    }
}
