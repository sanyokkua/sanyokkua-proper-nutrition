package com.kostenko.pp.presentation.json.pojos;

import com.kostenko.pp.data.pojos.User;
import com.kostenko.pp.formulas.Formula;
import com.kostenko.pp.formulas.implementation.HarrisBenedictFormula;
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
    private Double energy;
    private int permissionsId;

    public static JsonUser mapToJsonUser(User user) {
        Formula.Gender gender = user.getGenderId() == 2 ? Formula.Gender.FEMALE : Formula.Gender.MALE;
        double calculated = new HarrisBenedictFormula().calculate(user.getWeight(), user.getHeight(), user.getAge(), gender, Formula.Activity.LOW);
        return JsonUser.builder()
                       .userId(user.getUserId())
                       .email(user.getEmail())
                       .age(user.getAge())
                       .height(user.getHeight())
                       .weight(user.getWeight())
                       .genderId(user.getGenderId())
                       .roleId(user.getRoleId())
                       .password("")
                       .energy(calculated)
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
