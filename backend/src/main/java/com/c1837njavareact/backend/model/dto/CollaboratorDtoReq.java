package com.c1837njavareact.backend.model.dto;

import com.c1837njavareact.backend.model.entities.Proyecto;
import com.c1837njavareact.backend.model.entities.UserEntity;
import com.c1837njavareact.backend.model.enums.Role;

public record CollaboratorDtoReq(
        Proyecto proyecto,
        UserEntity user,
        Role role
) {
}
