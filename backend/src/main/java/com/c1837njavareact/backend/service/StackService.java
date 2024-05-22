package com.c1837njavareact.backend.service;


import com.c1837njavareact.backend.model.dto.StackDtoReq;
import com.c1837njavareact.backend.model.dto.StackDtoRes;

import java.util.List;

public interface StackService {
  StackDtoRes create(StackDtoReq stack);
  List<StackDtoRes> getAll();
  StackDtoRes getById(int id);
  void deleteById(int id);
}
