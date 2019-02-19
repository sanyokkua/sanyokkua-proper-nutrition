package com.kostenko.pp.data.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@EqualsAndHashCode
@Builder
@AllArgsConstructor
@Entity
@SequenceGenerator(schema = "pp_app", name = "product_id_generator", sequenceName = "product_id_generator", allocationSize = 10)
@Table(schema = "pp_app", name = "product", uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
public class Product {

    @EqualsAndHashCode.Exclude
    @Id
    @GeneratedValue(generator = "product_id_generator")
    @Column(name = "product_id", nullable = false)
    private Long productId;
    @EqualsAndHashCode.Include
    @NaturalId
    @Column(name = "name", nullable = false)
    private String name;
    @EqualsAndHashCode.Include
    @Column(name = "energy", nullable = false)
    private Double energy;
    @EqualsAndHashCode.Exclude
    @Column(name = "amount")
    private Long amount;

    @EqualsAndHashCode.Exclude
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "prod_type_id")
    private ProductType productType;

    @EqualsAndHashCode.Exclude
    @ManyToMany(mappedBy = "products")
    private Set<Dish> dishes = new HashSet<>();

    public Product() {
    }
}
