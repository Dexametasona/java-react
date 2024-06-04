package com.c1837njavareact.backend.service;

import com.c1837njavareact.backend.model.dto.UserDtoReq;
import com.c1837njavareact.backend.model.dto.UserDtoRes;

import java.util.List;

public interface UserService {
  UserDtoRes getById(int id);
  UserDtoRes updateById(UserDtoReq user, int id);
  void deleteById(int id);
}
