package com.kostenko.pp.formulas;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class HarrisBenedictFormula implements Formula {

    @Override
    public long calculate(int weight, int height, int age, Gender gender, Activity activity) {
        log.info("Calculating for {}, with age {}, height {}, weight {} for activity {}", gender.name(), age, height, weight, activity.name());
        double bmr;
        if (Gender.MALE == gender) {
            bmr = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
        } else {
            bmr = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
        }
        return (long) (bmr * activity.getCoefficient());
    }
}
