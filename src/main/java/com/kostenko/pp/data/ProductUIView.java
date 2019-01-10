package com.kostenko.pp.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductUIView {
    private Long id;
    private String name;
    private int energy;
    private Long typeId;
    private String typeName;
}
