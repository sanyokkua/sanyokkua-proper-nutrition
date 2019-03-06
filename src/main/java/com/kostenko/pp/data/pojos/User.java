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
    private String genderName;
    private Long roleId;
    private String roleName;
}
