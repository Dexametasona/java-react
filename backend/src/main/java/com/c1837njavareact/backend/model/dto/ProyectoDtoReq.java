package com.c1837njavareact.backend.model.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record ProyectoDtoReq(
        @Size(min=5, max = 255)
        String name,
        @Size(min=10, max = 1000, message = "Mínimo 10 caracteres y máximo 1000.")
        String description,
        @Size(min=10, max = 255, message = "Mínimo 10 y máximo 255 caracteres.")
        String channel,
        @Size(min = 1) List<Integer> stacks,
        @NotNull int tagId
){}