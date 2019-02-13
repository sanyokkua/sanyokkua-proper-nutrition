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
@Table(name = "prod_type", uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
public class ProductType {
    @Id
    @GeneratedValue
    @Column(name = "prod_type_id", nullable = false)
    private Long prodTypeId;
    @NaturalId
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "productType", orphanRemoval = true)
    private Set<Product> products = new HashSet<>();

    public ProductType() {
    }

    public void addProduct(Product product) {
        if (product==null){
            products = new HashSet<>();
        }
        products.add(product);
        product.setProductType(this);
    }

    public void removeProduct(Product product) {
        products.remove(product);
        product.setProductType(null);
    }
}
