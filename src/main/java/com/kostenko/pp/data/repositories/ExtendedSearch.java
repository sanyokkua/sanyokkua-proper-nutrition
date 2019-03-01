package com.kostenko.pp.data.repositories;

public interface ExtendedSearch<T, S extends SearchBuilder<T>> {
    S findByPages();
}
