package com.c1837njavareact.backend.model.dto;

import com.c1837njavareact.backend.model.enums.ProyectoRole;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record PositionDtoReq(
        @NotNull ProyectoRole proyectoRole,
        @NotNull @Min(1) int quantity,
        @NotNull @Size(max = 1000)
        String description,
        @NotNull int idProyecto
) {
}
