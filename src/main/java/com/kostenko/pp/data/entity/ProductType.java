package com.kostenko.pp.data.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;

@Slf4j
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "productsType", uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
public class ProductType {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private long id;
    @Column(name = "name", nullable = false)
    private String name;
}
