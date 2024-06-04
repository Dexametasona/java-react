package com.c1837njavareact.backend.model.dto;

import com.c1837njavareact.backend.model.enums.ProyectoRole;

public record CollaboratorDtoRes(
        int userId,
        String userName,
        ProyectoRole proyectoRole
) {}
