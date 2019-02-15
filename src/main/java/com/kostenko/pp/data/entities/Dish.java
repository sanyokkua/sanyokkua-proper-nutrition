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
@Table(name = "dish", uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
public class Dish {
    @Id
    @GeneratedValue
    @Column(name = "dish_id", nullable = false)
    private Long dishId;
    @NaturalId
    @Column(name = "name", nullable = false)
    private String name;

    @ManyToMany(mappedBy = "dishes", fetch = FetchType.EAGER)
    private Set<AppUser> appUsers = new HashSet<>();

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinTable(name = "dish_products", joinColumns = @JoinColumn(name = "dish_id"), inverseJoinColumns = @JoinColumn(name = "product_id"))
    private Set<Product> products = new HashSet<>();

    public Dish() {
    }

    public void addProduct(Product product) {
        products.add(product);
        product.getDishes().add(this);
    }

    public void removeProduct(Product product) {
        products.remove(product);
        product.getDishes().remove(this);
    }
}
