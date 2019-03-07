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
@Table(schema = Constants.SCHEMA, name = Constants.ProductType.TABLE, uniqueConstraints = {@UniqueConstraint(columnNames = Constants.ProductType.NAME)})
public class ProductType {
    @EqualsAndHashCode.Exclude
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = Constants.ProductType.ID, nullable = false, columnDefinition = "serial")
    private Long prodTypeId;
    @EqualsAndHashCode.Include
    @NaturalId
    @Column(name = Constants.ProductType.NAME, nullable = false)
    private String name;

    @Builder.Default
    @EqualsAndHashCode.Exclude
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "productType", orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<Product> products = new HashSet<>();

}
