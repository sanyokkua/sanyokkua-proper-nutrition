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
@Table(name = "prod_type", uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
public class ProductType {
    @Id
    @GeneratedValue
    @Column(name = "prod_type_id", nullable = false)
    private Long prodTypeId;
    @NaturalId
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "productType", orphanRemoval = true, fetch = FetchType.EAGER)
    private Set<Product> products = new HashSet<>();

    public ProductType() {
    }

    public void addProduct(Product product) {
        products.add(product);
        product.setProductType(this);
    }

    public void removeProduct(Product product) {
        products.remove(product);
        product.setProductType(null);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ProductType that = (ProductType) o;
        return new EqualsBuilder().append(name, that.name).isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(name).toHashCode();
    }
}
