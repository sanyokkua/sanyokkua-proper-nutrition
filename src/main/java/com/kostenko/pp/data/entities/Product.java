package com.kostenko.pp.data.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@Entity
@Table(name = "product", uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
public class Product {

    @Id
    @GeneratedValue
    @Column(name = "product_id", nullable = false)
    private Long productId;
    @NaturalId
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "energy", nullable = false)
    private Double energy;
    @Column(name = "amount")
    private Long amount;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "prod_type_id")
    private ProductType productType;

    @ManyToMany(mappedBy = "products")
    private Set<Dish> dishes = new HashSet<>();

    public Product() {
    }
}
