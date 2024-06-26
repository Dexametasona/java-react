package com.c1837njavareact.backend.model.dto;

import com.c1837njavareact.backend.model.enums.ProyectoRole;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record  JoinRequestDtoReq(
        @NotNull int proyectoTarget,
        @NotNull ProyectoRole proyectoRole,
        @Size(min=1, max = 255)
        String message
) {
}
