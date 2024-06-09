package com.c1837njavareact.backend.model.dto;

import com.c1837njavareact.backend.model.enums.Status;

import java.time.LocalDateTime;
import java.util.Set;

public record ProyectoDetailedDto(
        int id,
        String name,
        String description,
        LocalDateTime createdAt,
        String channel,
        Status status,
        int rating,
        TagDtoRes tag,
        Set<StackDtoRes> stacks,
        Set<CollaboratorDtoRes> collaborators,
        Set<JoinRequestDtoRes> joinRequests,
        Set<PositionDtoRes> positions
) {
}
