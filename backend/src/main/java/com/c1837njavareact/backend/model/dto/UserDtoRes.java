package com.c1837njavareact.backend.model.dto;

import java.util.List;

public record UserDtoRes(
        int id,
        String username,
        String email,
        List<StackDtoRes> stacks
) {
}
