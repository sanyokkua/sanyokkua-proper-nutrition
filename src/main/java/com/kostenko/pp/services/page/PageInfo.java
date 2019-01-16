package com.kostenko.pp.services.page;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;
import java.util.Optional;

@Data
@Slf4j
public class PageInfo {
    public static final String SEARCH_STRING = "searchString";
    public static final String TYPE_ID = "typeid";
    private static final int PAGE_SIZE = 10;
    private Integer uiPageNumber;
    private Integer dbPageNumber;
    private Integer recordsPerPage;
    private Map<String, String> params;

    private PageInfo(Integer uiPageNumber, Integer dbPageNumber, Integer recordsPerPage, Map<String, String> params) {
        this.uiPageNumber = uiPageNumber;
        this.dbPageNumber = dbPageNumber;
        this.recordsPerPage = recordsPerPage;
        this.params = params;
    }

    public static PageInfo createPageInfo(Integer uiPageNumber, Integer recordsPerPage, Map<String, String> params) {
        int page = Optional.ofNullable(uiPageNumber).orElse(0);
        int dbPageNumber = page > 0 ? page - 1 : page;
        int dbRecordsPerPage = recordsPerPage != null && recordsPerPage > 0 ? recordsPerPage : PAGE_SIZE;
        return new PageInfo(page, dbPageNumber, dbRecordsPerPage, params);
    }

    public String getParam(String key) {
        return params.get(key);
    }
}
