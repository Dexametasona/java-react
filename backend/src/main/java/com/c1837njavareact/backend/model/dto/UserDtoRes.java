package com.c1837njavareact.backend.model.dto;

import java.time.LocalDateTime;
import java.util.Set;

public record UserDtoRes(
        int id,
        String userName,
        String email,
        Set<StackDtoRes> stacks,
        LocalDateTime createdAt
) {
}
