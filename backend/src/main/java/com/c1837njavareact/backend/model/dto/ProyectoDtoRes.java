package com.c1837njavareact.backend.model.dto;

import java.util.List;

public record ProyectoDtoRes(
        int id,
        String name,
        String description,
        List<StackDtoRes> stacks
) {}