package com.kostenko.pp.data.repositories;

import com.kostenko.pp.data.entity.ProductType;
import org.springframework.data.repository.CrudRepository;

public interface ProductTypeRepository extends GeneralRepository<ProductType>, CrudRepository<ProductType, Long> {
}
