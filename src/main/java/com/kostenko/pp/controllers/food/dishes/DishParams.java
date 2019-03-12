package com.kostenko.pp.controllers.food.dishes;

import com.kostenko.pp.controllers.extensions.RequestParams;
import lombok.Data;

@Data
class DishParams implements RequestParams {
    private String searchString;
    private Integer page;
    private Integer recordsPerPage;

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
