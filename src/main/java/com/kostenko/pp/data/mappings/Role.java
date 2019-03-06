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
@Table(schema = Constants.SCHEMA, name = Constants.Role.TABLE, uniqueConstraints = {@UniqueConstraint(columnNames = Constants.Role.NAME)})
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = Constants.Role.ID, nullable = false, columnDefinition = "serial")
    private Long roleId;
    @NaturalId
    @Column(name = Constants.Role.NAME, nullable = false)
    private String name;

    @Builder.Default
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "role", orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<AppUser> appUsers = new HashSet<>();
}
