package com.kostenko.pp.controllers.food;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalculatorParams {
    private Integer age;
    private Integer height;
    private Integer weight;
    private String gender;
    private String formula;
    private String activity;
}
