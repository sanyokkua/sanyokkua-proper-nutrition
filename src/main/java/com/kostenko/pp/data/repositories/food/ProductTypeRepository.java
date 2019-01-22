package com.kostenko.pp.data.repositories.food;

import com.kostenko.pp.data.entity.ProductType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductTypeRepository extends GeneralRepository<ProductType>, CrudRepository<ProductType, Long> {
}
