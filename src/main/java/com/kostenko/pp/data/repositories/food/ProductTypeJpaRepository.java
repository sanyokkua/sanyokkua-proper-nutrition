package com.kostenko.pp.data.repositories.food;

import com.kostenko.pp.data.entities.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductTypeJpaRepository extends JpaRepository<ProductType, Long> {
    ProductType findByName(String name);
    boolean existsByName(String name);
}
