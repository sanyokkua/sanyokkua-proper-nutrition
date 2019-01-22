package com.kostenko.pp.data.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Slf4j
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users", uniqueConstraints = {@UniqueConstraint(columnNames = "login"),
                                            @UniqueConstraint(columnNames = "email")})
public class User {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private long id;
    @Column(name = "age")
    private int age;
    @Column(name = "weight")
    private int weight;
    @Column(name = "height")
    private int height;
    @Column(name = "gender")
    private boolean gender;
    @Column(name = "email", nullable = false)
    private String email;
    @Column(name = "login", nullable = false)
    private String login;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "roleId", nullable = false)
    private long roleId;
    @ElementCollection
    @CollectionTable(name = "user_dishes", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "dishes")
    private List<Long> dishes;

    public static class UserBuilder {
        private long id;
        private int age;
        private int weight;
        private int height;
        private boolean gender;
        private String email;
        private String login;
        private String password;
        private long roleId;
        private List<Long> dishes;

        public UserBuilder setId(long id) {
            this.id = id;
            return this;
        }

        public UserBuilder setAge(int age) {
            this.age = age;
            return this;
        }

        public UserBuilder setWeight(int weight) {
            this.weight = weight;
            return this;
        }

        public UserBuilder setHeight(int height) {
            this.height = height;
            return this;
        }

        public UserBuilder setGender(boolean gender) {
            this.gender = gender;
            return this;
        }

        public UserBuilder setEmail(String email) {
            this.email = Objects.requireNonNull(email, "Passed null instead of email");
            return this;
        }

        public UserBuilder setLogin(String login) {
            this.login = Objects.requireNonNull(login, "Passed null instead of login");
            return this;
        }

        public UserBuilder setPassword(String password) {
            this.password = Objects.requireNonNull(password, "Passed null instead of password");
            return this;
        }

        public UserBuilder setRoleId(long roleId) {
            this.roleId = roleId;
            return this;
        }

        public UserBuilder setDishes(List<Long> dishes) {
            this.dishes = Objects.requireNonNull(dishes, "Passed null instead of dishes list");
            return this;
        }

        public User build() {
            return new User(id, age, weight, height, gender, email, login, password, roleId, dishes);
        }
    }
}
