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
@Table(schema = "pp_app", name = "prod_type", uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
public class ProductType {
    @EqualsAndHashCode.Exclude
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prod_type_id", nullable = false, columnDefinition = "serial")
    private Long prodTypeId;
    @EqualsAndHashCode.Include
    @NaturalId
    @Column(name = "name", nullable = false)
    private String name;

    @EqualsAndHashCode.Exclude
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "productType", orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Product> products = new HashSet<>();

}
