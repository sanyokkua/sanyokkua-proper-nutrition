package com.kostenko.pp.formulas;

public interface Formula {
    long calculate(int weight, int height, int age, Gender gender, Activity activity);

    enum Activity {
        LOW(1.2), MEDIUM(1.375), HIGH(1.55), VERY_HIGH(1.9);

        private double coefficient;

        Activity(double coefficient) {
            this.coefficient = coefficient;
        }

        public double getCoefficient() {
            return coefficient;
        }
    }

    enum Gender {
        MALE, FEMALE;
    }
}
