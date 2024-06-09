package com.c1837njavareact.backend.model.dto;

import com.c1837njavareact.backend.model.enums.ProyectoRole;

public record PositionDtoRes(
        int id,
        ProyectoRole proyectoRole,
        int quantity,
        String description
) {
}
