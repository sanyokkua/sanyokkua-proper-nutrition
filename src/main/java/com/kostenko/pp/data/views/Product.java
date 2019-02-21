package com.kostenko.pp.data.views;

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
    private String name;
    private double energy;
    private long amount;
    private long prodTypeId;
    private String typeName;
}
