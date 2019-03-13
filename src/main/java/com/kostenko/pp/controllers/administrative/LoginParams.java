package com.kostenko.pp.controllers.administrative;

import lombok.Data;
import lombok.ToString;

@Data
@ToString(exclude = "password")
final class LoginParams {
    private String email;
    private String password;
}
