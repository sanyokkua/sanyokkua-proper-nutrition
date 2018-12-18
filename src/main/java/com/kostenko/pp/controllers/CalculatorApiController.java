package com.kostenko.pp.controllers;

import com.kostenko.pp.formulas.Formula;
import com.kostenko.pp.formulas.HarrisBenedictFormula;
import com.kostenko.pp.formulas.MifflinSanJeoreFormula;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class CalculatorApiController {

  @GetMapping("/calc")
  public long calculate(@RequestParam(value = "age") int age, @RequestParam(value = "height") int height, @RequestParam(value = "weight") int weight, @RequestParam(value = "gender") String gender,
      @RequestParam(value = "formula") String formula, @RequestParam(value = "activity") String activity) {
    Formula finalFormula = "benedict".equals(formula) ? new HarrisBenedictFormula() : new MifflinSanJeoreFormula();
    Formula.Activity formulaActivity = Formula.Activity.getActivity(activity);
    Formula.Gender formulaGender = "male".equals(gender) ? Formula.Gender.MALE : Formula.Gender.FEMALE;
    final long calculate = finalFormula.calculate(weight, height, age, formulaGender, formulaActivity);
    log.info("calculated: {}, by age {} height {} weight {} gender {} activity {} ", calculate, age, height, weight, formulaGender, formulaActivity);
    return calculate;
  }

}
