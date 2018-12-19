package com.kostenko.pp.data.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;

@Slf4j
@Data
@AllArgsConstructor
@Entity
@Table(schema = "products", uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
public class Product {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private long id;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "energy", nullable = false)
    private int energy;
}
