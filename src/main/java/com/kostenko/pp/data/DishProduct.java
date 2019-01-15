package com.kostenko.pp.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DishProduct {
    private long id;
    private String name;
    private int energy;
    private long typeId;
    private String typeName;
    private int amount;
}
