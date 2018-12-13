package com.kostenko.pp.data.entity;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
//import java.util.List;

@Slf4j
@Data
@Entity
@Table(schema = "dishes", uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
public class Dish {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private long id;
    @Column(name = "name", nullable = false)
    private String name;
    //@Column(name = "products", nullable = false)
    //private List<Product> products;
}
