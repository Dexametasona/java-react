package com.c1837njavareact.backend.model.dto;

import java.time.LocalDateTime;

public record JoinRequestDtoRes(
        String user,
        String proyectoTarget,
        String message,
        LocalDateTime createdAt
) {
}
