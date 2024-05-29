package com.c1837njavareact.backend.model.dto;

import jakarta.validation.constraints.Size;

public record TagDtoReq (
   @Size(min = 3, max = 25) String name
){ }
