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
@Table(schema = Constants.SCHEMA, name = Constants.Gender.TABLE, uniqueConstraints = {@UniqueConstraint(columnNames = Constants.Gender.NAME)})
public class Gender {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = Constants.Gender.ID, nullable = false, columnDefinition = "serial")
    private Long genderId;
    @NaturalId
    @Column(name = Constants.Gender.NAME, nullable = false)
    private String name;

    @Builder.Default
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "gender", orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<AppUser> appUsers = new HashSet<>();
}
