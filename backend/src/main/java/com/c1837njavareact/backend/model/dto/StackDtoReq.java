package com.c1837njavareact.backend.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record StackDtoReq(
        @NotBlank @Size(max=50) String name
) {}
