package com.c1837njavareact.backend.model.dto;

import jakarta.validation.constraints.NotBlank;

public record EmailDto(
        @NotBlank String email
) {
}
