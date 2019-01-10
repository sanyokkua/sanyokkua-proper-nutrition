package com.kostenko.pp.data.repositories;

import com.kostenko.pp.data.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {

    Product findByNameAndTypeId(String name, Long typeID);

    Product findByName(String name);

    List<Product> findAllByNameIsStartingWith(String name);

    Page<Product> findAllByNameIsContaining(Pageable pageable, String name);

    Page<Product> findAll(Pageable pageable);

    Page<Product> findAllByTypeId(Pageable pageable, Long typeId);

    long countAllByTypeId(Long typeId);

    Page<Product> findAllByNameIsContainingAndTypeId(Pageable pageable, String name, Long typeId);

}
