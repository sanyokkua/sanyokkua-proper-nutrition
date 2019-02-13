package com.kostenko.pp.data;

import com.kostenko.pp.data.entities.ProductType;
import lombok.Builder;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;

import java.util.Objects;

@Data
@Builder
public class RequestInfo {
    private static final int DEFAULT_PAGE_SIZE = 10;
    private int uiPageNumber;
    private int dbPageNumber;
    private int recordsPerPage;
    private String search;
    private ProductType productType;

    public boolean isCombinedSearch() {
        return hasSearch() && hasProductType();
    }

    public boolean hasSearch() {
        return StringUtils.isNotBlank(search);
    }

    public boolean hasProductType() {
        return !Objects.isNull(productType);
    }

    public Integer getDbPageNumber() {
        int page = uiPageNumber >= 0 ? uiPageNumber : 0;
        return page > 0 ? page - 1 : page;
    }

    public Integer getRecordsPerPage() {
        return recordsPerPage > 0 ? recordsPerPage : DEFAULT_PAGE_SIZE;
    }
}