package com.kostenko.pp.data.mappings;

import com.kostenko.pp.data.Constants;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NaturalId;
import org.hibernate.annotations.NaturalIdCache;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@NaturalIdCache
@Table(schema = Constants.SCHEMA, name = Constants.Dish.TABLE, uniqueConstraints = {@UniqueConstraint(columnNames = Constants.Dish.NAME)})
public class Dish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = Constants.Dish.ID, nullable = false, columnDefinition = "serial")
    private Long dishId;
    @NaturalId
    @Column(name = Constants.Dish.NAME, nullable = false)
    private String name;

    @Builder.Default
    @ManyToMany(mappedBy = "dishes", fetch = FetchType.EAGER)
    private Set<AppUser> appUsers = new HashSet<>();

    @Builder.Default
    @OneToMany(mappedBy = "dish", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<DishProducts> products = new HashSet<>();
}
