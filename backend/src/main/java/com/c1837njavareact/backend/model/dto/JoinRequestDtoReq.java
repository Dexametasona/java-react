package com.c1837njavareact.backend.model.dto;

import jakarta.validation.constraints.Size;

public record  JoinRequestDtoReq(
        int userTarget,
        int userOrigin,
        int proyectoTarget,
        @Size(max = 255, message = "Máximo 255 caracteres.")
        String message
) {
}
