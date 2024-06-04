package com.c1837njavareact.backend.model.dto;

import java.time.LocalDateTime;
import java.util.List;

public record UserDtoRes(
        int id,
        String userName,
        String email,
        List<StackDtoRes> stacks,
        LocalDateTime createdAt
) {
}
