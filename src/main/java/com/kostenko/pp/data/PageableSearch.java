package com.kostenko.pp.data;

import lombok.NonNull;
import org.springframework.data.domain.Page;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public interface PageableSearch<T> {
    int DEFAULT_PAGE_SIZE = 10;

    Page<T> findAll(@Nonnull @NonNull SearchParams searchParams);

    default Integer getDbPageNumber(@Nullable Integer uiPageNumber) {
        int page = Objects.nonNull(uiPageNumber) && uiPageNumber >= 0 ? uiPageNumber : 0;
        return page > 0 ? page - 1 : page;
    }

    default Integer getRecordsPerPage(@Nullable Integer recordsPerPage) {
        return Objects.nonNull(recordsPerPage) && recordsPerPage > 0 ? recordsPerPage : DEFAULT_PAGE_SIZE;
    }

    class SearchParams<T> {
        private Map<String, T> entities = new HashMap<>();
        private Map<String, Long> longs = new HashMap<>();
        private Map<String, Integer> ints = new HashMap<>();
        private Map<String, String> strings = new HashMap<>();

        public void add(@Nonnull @NonNull String key, T value, boolean skipIfNull) {
            add(entities, key, value, skipIfNull);
        }

        private static <K, V> void add(Map<K, V> map, K key, V value, boolean skipIfNull) { // null | object -> null && skip | null && !skip | object && skip | object && !skip
            if (skipIfNull && value == null) {

            } else {
                map.put(key, value);
            }
        }

        public void add(@Nonnull @NonNull String key, Long value, boolean skipIfNull) {
            add(longs, key, value, skipIfNull);
        }

        public void add(@Nonnull @NonNull String key, Integer value, boolean skipIfNull) {
            add(ints, key, value, skipIfNull);
        }

        public void add(@Nonnull @NonNull String key, String value, boolean skipIfNull) {
            add(strings, key, value, skipIfNull);
        }

        @Nullable
        public T getEntity(@Nonnull @NonNull String key) {
            return entities.getOrDefault(key, null);
        }

        @Nullable
        public Long getLong(@Nonnull @NonNull String key) {
            return longs.getOrDefault(key, null);
        }

        @Nullable
        public Integer getInt(@Nonnull @NonNull String key) {
            return ints.getOrDefault(key, null);
        }

        @Nullable
        public String getString(@Nonnull @NonNull String key) {
            return strings.getOrDefault(key, null);
        }

        public void checkRequiredParams(@Nonnull @NonNull String... params) {
            for (String param : params) {
                if (!hasParam(param)) {
                    throw new IllegalArgumentException("Param: " + param + " is absent");
                }
            }
        }

        public boolean hasParam(@Nonnull @NonNull String key) {
            return entities.containsKey(key) || longs.containsKey(key) || strings.containsKey(key);
        }
    }
}
