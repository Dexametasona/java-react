package com.c1837njavareact.backend.model.dto;

import com.c1837njavareact.backend.model.enums.ProyectoRole;

import java.time.LocalDateTime;

public record JoinRequestDtoRes(
        int id,
        String user,
        String proyectoTarget,
        String message,
        ProyectoRole proyectoRole,
        LocalDateTime createdAt
) {
}
