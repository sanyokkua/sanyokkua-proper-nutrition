package com.kostenko.pp.data.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.NaturalId;

import javax.annotation.Nonnull;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@Entity
@SequenceGenerator(schema = "pp_app", name = "user_id_generator", sequenceName = "user_id_generator", allocationSize = 10)
@Table(schema = "pp_app", name = "appuser", uniqueConstraints = {@UniqueConstraint(columnNames = "login"), @UniqueConstraint(columnNames = "email")})
public class AppUser {
    @Id
    @GeneratedValue(generator = "user_id_generator")
    @Column(name = "user_id", nullable = false)
    private Long userId;
    @NaturalId
    @Column(name = "email", nullable = false)
    private String email;
    @NaturalId
    @Column(name = "login", nullable = false)
    private String login;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "age")
    private Integer age;
    @Column(name = "height")
    private Integer height;
    @Column(name = "weight")
    private Integer weight;

    @ManyToOne
    @JoinColumn(name = "gender_id")
    private Gender gender;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(schema = "pp_app", name = "user_dishes", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "dish_id"))
    private Set<Dish> dishes = new HashSet<>();

    public AppUser() {
    }

    public void addDish(@Nonnull Dish dish) {
        dishes.add(Objects.requireNonNull(dish));
        dish.getAppUsers().add(this);
    }

    public void removeDish(@Nonnull Dish dish) {
        dishes.remove(Objects.requireNonNull(dish));
        dish.getAppUsers().remove(this);
    }
}
