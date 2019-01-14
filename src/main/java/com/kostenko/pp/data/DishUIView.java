package com.kostenko.pp.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DishUIView {
    private Long id;
    private String name;
    private List<Object> products;
    private int totalEnergy;
}
