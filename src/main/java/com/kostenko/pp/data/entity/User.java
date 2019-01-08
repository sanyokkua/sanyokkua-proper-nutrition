package com.kostenko.pp.data.entity;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;

@Slf4j
@Data
@Entity
@Table(schema = "users", uniqueConstraints = {@UniqueConstraint(columnNames = "login"),
                                              @UniqueConstraint(columnNames = "email")})
public class User {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private long id;
    @Column(name = "age", nullable = false)
    private int age;
    @Column(name = "weight", nullable = false)
    private int weight;
    @Column(name = "height", nullable = false)
    private int height;
    @Column(name = "gender", nullable = false)
    private boolean gender;
    @Column(name = "email", nullable = false)
    private String email;
    @Column(name = "login", nullable = false)
    private String login;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "roleId", nullable = false)
    private long roleId;

}
