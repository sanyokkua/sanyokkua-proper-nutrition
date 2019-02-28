package com.kostenko.pp.data.pojos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    private long productId;
    private String productName;
    private double productEnergy;
    private long productAmount;
    private long prodTypeId;
    private String prodTypeName;
}
