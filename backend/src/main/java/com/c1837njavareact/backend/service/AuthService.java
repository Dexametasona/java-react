package com.c1837njavareact.backend.service;

import com.c1837njavareact.backend.model.dto.*;

public interface AuthService {
  public registerDtoRes register(UserDtoReq user);
  public LoginDtoRes login(LoginDtoReq request);
}
