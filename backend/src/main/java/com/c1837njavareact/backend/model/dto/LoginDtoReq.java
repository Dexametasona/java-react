package com.c1837njavareact.backend.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record LoginDtoReq(
        @NotBlank String email,
        @NotBlank String password
) {}
