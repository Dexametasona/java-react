package com.c1837njavareact.backend.model.dto;

import com.c1837njavareact.backend.model.enums.Role;

public record CollaboratorDtoRes(
        int user_id,
        String username,
        Role role
) {}
