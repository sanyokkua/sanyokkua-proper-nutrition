package com.kostenko.pp.data.services;

import com.kostenko.pp.data.PageableSearch;

public interface PageableDBService<T> extends DBService<T>, PageableSearch<T> {
}
