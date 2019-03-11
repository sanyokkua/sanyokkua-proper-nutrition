package com.kostenko.pp.data.pojos;

import lombok.*;

@Data
@ToString(exclude = "password")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    private Long userId;
    private String email;
    private String password;
    private Integer age;
    private Integer height;
    private Integer weight;
    private Long genderId;
    private Long roleId;

    public void update(User another) {
        this.email = another.email;
        this.age = another.age;
        this.height = another.height;
        this.weight = another.weight;
        this.genderId = another.genderId;
        this.roleId = another.roleId;
    }
}
