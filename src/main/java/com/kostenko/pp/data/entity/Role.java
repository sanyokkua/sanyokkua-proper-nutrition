package com.kostenko.pp.data.entity;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;

@Slf4j
@Data
@Entity
@Table(schema = "roles", uniqueConstraints = {@UniqueConstraint(columnNames = "name")})
public class Role {
    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    private long id;
    @Column(name = "name", nullable = false)
    private String name;
}
