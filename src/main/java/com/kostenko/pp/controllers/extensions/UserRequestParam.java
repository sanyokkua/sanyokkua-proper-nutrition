package com.kostenko.pp.controllers.extensions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.apache.commons.lang3.StringUtils;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public final class UserRequestParam {
    private String searchString;
    private Long page;
    private Long recordsPerPage;
    private Map<String, Object> additionalParams;

    @Nullable
    public Object get(@Nonnull @NonNull String paramName) {
        if (StringUtils.isBlank(paramName)) {
            return null;
        }
        return additionalParams.getOrDefault(paramName, null);
    }
}
