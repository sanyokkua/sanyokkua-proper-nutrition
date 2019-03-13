package com.kostenko.pp.controllers.food.calculator;

import com.kostenko.pp.formulas.Formula;
import com.kostenko.pp.formulas.implementation.HarrisBenedictFormula;
import com.kostenko.pp.formulas.implementation.MifflinSanJeoreFormula;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@Slf4j
public class CalculatorController {

    @GetMapping("/calculator/calculate")
    public long calculate(@NonNull CalculatorParams parameters) {
        final String formulaString = parameters.getFormula();
        final String activityString = parameters.getActivity();
        final String genderString = parameters.getGender();

        final Formula formula = HarrisBenedictFormula.class.getSimpleName().equalsIgnoreCase(formulaString) ? new HarrisBenedictFormula() : new MifflinSanJeoreFormula();
        final Formula.Activity activity = Formula.Activity.valueOf(activityString);
        final Formula.Gender gender = Formula.Gender.valueOf(genderString);

        final int weight = parameters.getWeight();
        final int height = parameters.getHeight();
        final int age = parameters.getAge();

        final long result = formula.calculate(weight, height, age, gender, activity);
        log.info("calculated: {}, by age {} height {} weight {} gender {} activity {} ", result, age, height, weight, gender, activity);
        return result;
    }

    @GetMapping("/calculator/formulas")
    public List<String> getAllFormulas() {
        List<String> formulas = Stream.of(HarrisBenedictFormula.class, MifflinSanJeoreFormula.class).map(Class::getSimpleName).collect(Collectors.toList());
        log.info("Created list of formulas names");
        return formulas;
    }

    @GetMapping("/calculator/genders")
    public List<String> getAllGenders() {
        List<String> genders = Stream.of(Formula.Gender.values()).map(Enum::name).collect(Collectors.toList());
        log.info("Created list of formulas genders");
        return genders;
    }

    @GetMapping("/calculator/activities")
    public List<String> getAllActivities() {
        List<String> genders = Stream.of(Formula.Activity.values()).map(Enum::name).collect(Collectors.toList());
        log.info("Created list of formulas activities");
        return genders;
    }

}
