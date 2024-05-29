package com.c1837njavareact.backend.model.dto;

import com.c1837njavareact.backend.model.enums.Status;

import java.time.LocalDateTime;
import java.util.Set;

public record ProyectoDtoRes(
        int id,
        String name,
        String description,
        Set<StackDtoRes> stacks,
        LocalDateTime createdAt,
        Set<CollaboratorDtoRes> collaborators,
        TagDtoRes tag,
        Status status
) {}