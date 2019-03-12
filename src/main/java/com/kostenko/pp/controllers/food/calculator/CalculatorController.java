package com.kostenko.pp.controllers.food.calculator;

import com.kostenko.pp.formulas.Formula;
import com.kostenko.pp.formulas.implementation.HarrisBenedictFormula;
import com.kostenko.pp.formulas.implementation.MifflinSanJeoreFormula;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class CalculatorController {

    @GetMapping("/calc")
    public long calculate(CalculatorParams parameters) {
        Formula finalFormula = "benedict".equals(parameters.getFormula()) ? new HarrisBenedictFormula() : new MifflinSanJeoreFormula();
        Formula.Activity formulaActivity = Formula.Activity.getActivity(parameters.getActivity());
        Formula.Gender formulaGender = "male".equalsIgnoreCase(parameters.getGender()) ? Formula.Gender.MALE : Formula.Gender.FEMALE;
        final long calculate = finalFormula.calculate(parameters.getWeight(), parameters.getHeight(), parameters.getAge(), formulaGender, formulaActivity);
        log.info("calculated: {}, by age {} height {} weight {} gender {} activity {} ", calculate, parameters.getAge(), parameters.getHeight(), parameters.getWeight(), formulaGender, formulaActivity);
        return calculate;
    }

}
