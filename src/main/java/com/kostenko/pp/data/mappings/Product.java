package com.kostenko.pp.data.mappings;

import com.kostenko.pp.data.Constants;
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
@Table(schema = Constants.SCHEMA, name = Constants.Product.TABLE, uniqueConstraints = {@UniqueConstraint(columnNames = Constants.Product.NAME)})
public class Product {

    @EqualsAndHashCode.Exclude
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = Constants.Product.ID, nullable = false, columnDefinition = "serial")
    private Long productId;
    @EqualsAndHashCode.Include
    @NaturalId
    @Column(name = Constants.Product.NAME, nullable = false)
    private String name;
    @EqualsAndHashCode.Include
    @Column(name = Constants.Product.ENERGY, nullable = false)
    private Double energy;

    @EqualsAndHashCode.Exclude
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = Constants.Product.PRODUCT_TYPE_ID)
    private ProductType productType;

    @Builder.Default
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<DishProducts> dishes = new HashSet<>();
}
