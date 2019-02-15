package com.kostenko.pp.data.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
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
    @GeneratedValue(generator = "prodIdSequence")
    @SequenceGenerator(name = "prodIdSequence", sequenceName = "prodIdSequence", allocationSize = 1)
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

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(name)
                .toHashCode();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }

        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Product product = (Product) o;

        return new EqualsBuilder()
                .append(name, product.name)
                .isEquals();
    }
}
