package com.kostenko.pp.data.mappings;

import com.kostenko.pp.data.Constants;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(schema = Constants.SCHEMA, name = Constants.AppUser.TABLE, uniqueConstraints = {@UniqueConstraint(columnNames = Constants.AppUser.EMAIL)})
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = Constants.AppUser.ID, nullable = false, columnDefinition = "serial")
    private Long userId;
    @NaturalId
    @Column(name = Constants.AppUser.EMAIL, nullable = false)
    private String email;
    @Column(name = Constants.AppUser.PASSWORD, nullable = false)
    private String password;
    @Column(name = Constants.AppUser.AGE)
    private Integer age;
    @Column(name = Constants.AppUser.HEIGHT)
    private Integer height;
    @Column(name = Constants.AppUser.WEIGHT)
    private Integer weight;

    @ManyToOne
    @JoinColumn(name = Constants.AppUser.GENDER_ID)
    private Gender gender;

    @ManyToOne
    @JoinColumn(name = Constants.AppUser.ROLE_ID)
    private Role role;

    @Builder.Default
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(schema = Constants.SCHEMA, name = Constants.UserDishes.TABLE,
            joinColumns = @JoinColumn(name = Constants.UserDishes.USER_ID), inverseJoinColumns = @JoinColumn(name = Constants.UserDishes.DISH_ID))
    private Set<Dish> dishes = new HashSet<>();
}
