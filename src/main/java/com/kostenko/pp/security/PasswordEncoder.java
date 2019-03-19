package com.kostenko.pp.security;

import lombok.NonNull;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.annotation.Nonnull;

@Component(value = "passwordEncoderPbkdf")
public class PasswordEncoder {
    private final Pbkdf2PasswordEncoder passwordEncoder = new Pbkdf2PasswordEncoder();

    public String encode(@NonNull @Nonnull String rawPassword) {
        if (StringUtils.isBlank(rawPassword)) {
            throw new IllegalArgumentException("Password is blank");
        }
        return passwordEncoder.encode(rawPassword);
    }

    public boolean isMatching(@NonNull @Nonnull String rawPassword, @NonNull @Nonnull String encodedPasswordFromDB) {
        if (StringUtils.isBlank(rawPassword) || StringUtils.isBlank(encodedPasswordFromDB)) {
            throw new IllegalArgumentException("Passwords is blank");
        }
        return passwordEncoder.matches(rawPassword, encodedPasswordFromDB);
    }
}
