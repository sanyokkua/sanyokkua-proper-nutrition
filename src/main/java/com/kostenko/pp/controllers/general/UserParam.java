package com.kostenko.pp.controllers.general;

import com.kostenko.pp.controllers.extensions.RequestParams;
import lombok.Data;

@Data
public class UserParam implements RequestParams {
    private String searchString;
    private Integer page;
    private Integer recordsPerPage;
    private Long userId;

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
