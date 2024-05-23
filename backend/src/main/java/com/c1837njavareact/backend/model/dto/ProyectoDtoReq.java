package com.c1837njavareact.backend.model.dto;

import java.util.List;

public record ProyectoDtoReq(
        String name,
        String description,
        List<Integer> stacks
){}