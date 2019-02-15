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
@Table(name = "role", uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
public class Role {
    @Id
    @GeneratedValue
    @Column(name = "role_id", nullable = false)
    private Long roleId;
    @NaturalId
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "role", orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<AppUser> appUsers = new HashSet<>();

    public Role() {
    }

    public void addUser(@Nonnull AppUser appUser) {
        this.appUsers.add(Objects.requireNonNull(appUser));
        appUser.setRole(this);
    }

    public void removeUser(@Nonnull AppUser appUser) {
        this.appUsers.remove(Objects.requireNonNull(appUser));
        appUser.setRole(null);
    }
}
