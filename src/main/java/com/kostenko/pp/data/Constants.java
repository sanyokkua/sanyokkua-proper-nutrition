package com.kostenko.pp.data;

public interface Constants {
    String SCHEMA = "pp_app";

    interface AppUser {
        String TABLE = "appuser";
        String ID = "user_id";
        String EMAIL = "email";
        String PASSWORD = "password";
        String AGE = "age";
        String HEIGHT = "height";
        String WEIGHT = "weight";
        String GENDER_ID = "gender_id";
        String ROLE_ID = "role_id";
    }

    interface Dish {
        String TABLE = "dish";
        String ID = "dish_id";
        String NAME = "name";
    }

    interface DishProducts {
        String TABLE = "dish_products";
        String AMOUNT = "amount";
    }

    interface Gender {
        String TABLE = "gender";
        String ID = "gender_id";
        String NAME = "name";
    }

    interface Product {
        String TABLE = "product";
        String ID = "product_id";
        String NAME = "name";
        String ENERGY = "energy";
        String PRODUCT_TYPE_ID = "prod_type_id";
    }

    interface ProductType {
        String TABLE = "prod_type";
        String ID = "prod_type_id";
        String NAME = "name";
    }

    interface Role {
        String TABLE = "role";
        String ID = "role_id";
        String NAME = "name";
    }

    interface UserDishes {
        String TABLE = "user_dishes";
        String USER_ID = "user_id";
        String DISH_ID = "dish_id";
    }
}
