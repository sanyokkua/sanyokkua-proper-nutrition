package com.kostenko.pp.data.mappings;

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
@Table(schema = "pp_app", name = "gender", uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
public class Gender {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gender_id", nullable = false, columnDefinition = "serial")
    private Long genderId;
    @NaturalId
    @Column(name = "name", nullable = false)
    private String name;

    @Builder.Default
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "gender", orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<AppUser> appUsers = new HashSet<>();
}
