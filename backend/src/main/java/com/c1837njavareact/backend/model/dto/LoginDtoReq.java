package com.c1837njavareact.backend.model.dto;

import jakarta.validation.constraints.NotNull;

public record LoginDtoReq(
        @NotNull String email,
        @NotNull String password
) {}
