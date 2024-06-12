package com.c1837njavareact.backend.service;

import com.c1837njavareact.backend.model.dto.PositionDtoReq;
import com.c1837njavareact.backend.model.dto.PositionDtoRes;
import com.c1837njavareact.backend.model.dto.ProyectoRoleDto;

import java.util.Set;

public interface PositionService {
  PositionDtoRes create(PositionDtoReq positionDtoReq);
  Set<PositionDtoRes> getAll();
  PositionDtoRes getById(int id);
  void deleteById(int id);

  Set<ProyectoRoleDto> getRoles();
}
