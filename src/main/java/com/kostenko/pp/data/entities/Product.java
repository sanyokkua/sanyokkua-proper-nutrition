package com.kostenko.pp.data.entities;

import lombok.*;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@EqualsAndHashCode
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(schema = "pp_app", name = "product", uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
public class Product {

    @EqualsAndHashCode.Exclude
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id", nullable = false, columnDefinition = "serial")
    private Long productId;
    @EqualsAndHashCode.Include
    @NaturalId
    @Column(name = "name", nullable = false)
    private String name;
    @EqualsAndHashCode.Include
    @Column(name = "energy", nullable = false)
    private Double energy;

    @EqualsAndHashCode.Exclude
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "prod_type_id")
    private ProductType productType;

    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<DishProducts> dishes = new HashSet<>();
}