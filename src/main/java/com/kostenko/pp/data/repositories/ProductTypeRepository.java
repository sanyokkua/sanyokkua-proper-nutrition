package com.kostenko.pp.data.repositories;

import com.kostenko.pp.data.entity.ProductType;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProductTypeRepository extends CrudRepository<ProductType, Long> {

    List<ProductType> findAllByNameLike(String name);

    ProductType findByName(String name);
}
