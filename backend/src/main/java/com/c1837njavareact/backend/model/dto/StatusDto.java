package com.c1837njavareact.backend.model.dto;

import com.c1837njavareact.backend.model.enums.Status;
import jakarta.validation.constraints.NotNull;

public record StatusDto(
        @NotNull Status status
) {
}
