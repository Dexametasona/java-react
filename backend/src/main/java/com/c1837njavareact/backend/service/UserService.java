package com.c1837njavareact.backend.service;

import com.c1837njavareact.backend.model.dto.EmailDto;
import com.c1837njavareact.backend.model.dto.UserDtoReq;
import com.c1837njavareact.backend.model.dto.UserDtoRes;

import java.util.Set;

public interface UserService {
  UserDtoRes getByEmail(EmailDto emailDto);
  Set<UserDtoRes> getAll();
  UserDtoRes updateById(UserDtoReq user, int id);
  void deleteById(int id);
}
