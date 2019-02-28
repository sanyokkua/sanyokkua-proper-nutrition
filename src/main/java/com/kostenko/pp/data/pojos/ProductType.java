package com.kostenko.pp.data.pojos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductType {
    private Long prodTypeId;
    private String prodTypeName;
}
