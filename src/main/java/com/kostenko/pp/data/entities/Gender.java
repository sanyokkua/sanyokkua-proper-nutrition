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
@Table(name = "gender", uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
public class Gender {
    @Id
    @GeneratedValue
    @Column(name = "gender_id", nullable = false)
    private Long genderId;
    @NaturalId
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "gender", orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<AppUser> appUsers = new HashSet<>();

    public Gender() {
    }

    public void addUser(@Nonnull AppUser appUser) {
        this.appUsers.add(Objects.requireNonNull(appUser));
        appUser.setGender(this);
    }

    public void removeUser(@Nonnull AppUser appUser) {
        this.appUsers.remove(Objects.requireNonNull(appUser));
        appUser.setGender(null);
    }
}
