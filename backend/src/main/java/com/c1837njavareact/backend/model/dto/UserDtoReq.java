package com.c1837njavareact.backend.model.dto;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.List;

public record UserDtoReq(
        @Pattern(regexp = "^[^\\s]+$", message = "No se permiten espacios.")
        @Size(min = 3, max = 25)
        String userName,
        @Pattern(regexp = "^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9-]{2,}\\.[a-zA-Z]{2,}$",
        message = "No coíncide con ^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9-]{2,}\\.[a-zA-Z]{2,}$")
        @Size(min = 10)
        String email,
        @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-_+|!¡@#$%^&\\.{}\\*\"'\\/()=?!¿'´~;,:<>°])[A-Za-z\\d-_+|!¡@#$%^&\\.{}\\*\"'\\/()=?!¿'´~;,:<>°]+$")
        @Size(min = 8, max = 16)
        String password,
        @Size(min = 1)
        List<Integer> stacks
) {
}
