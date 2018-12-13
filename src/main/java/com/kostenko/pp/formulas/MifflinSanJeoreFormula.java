package com.kostenko.pp.formulas;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class MifflinSanJeoreFormula implements Formula {
    private static final int MALE = 5;
    private static final int FEMALE = -161;

    @Override
    public long calculate(int weight, int height, int age, Gender gender, Activity activity) {
        int genderCoefficient = gender == Gender.MALE ? MALE : FEMALE;
        log.info("Calculating for {}, with age {}, height {}, weight {} for activity {}", gender.name(), age, height, weight, activity.name());
        double bmr = (9.99 * weight) + (6.25 * height) - (4.92 * age) + genderCoefficient;
        return (long) (bmr * activity.getCoefficient());
    }
}
