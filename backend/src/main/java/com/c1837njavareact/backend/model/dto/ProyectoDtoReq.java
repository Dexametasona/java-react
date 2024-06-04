package com.c1837njavareact.backend.model.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record ProyectoDtoReq(
        String name,
        String description,
        @Size(min = 1) List<Integer> stacks,
        @NotNull int tagId,
        @NotNull int ownerId
){}