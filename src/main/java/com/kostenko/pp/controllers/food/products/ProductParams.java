package com.kostenko.pp.controllers.food.products;

import com.kostenko.pp.controllers.extensions.RequestParams;
import lombok.Data;

@Data
class ProductParams implements RequestParams {
    private String searchString;
    private Integer page;
    private Integer recordsPerPage;
    private Long currentType;

    @Override
    public String getSearchString() {
        return this.searchString;
    }

    @Override
    public Integer getPage() {
        return this.page;
    }

    @Override
    public Integer getRecordsPerPage() {
        return this.recordsPerPage;
    }
}
