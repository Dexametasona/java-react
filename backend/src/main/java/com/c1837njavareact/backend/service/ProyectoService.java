package com.c1837njavareact.backend.service;

import com.c1837njavareact.backend.model.dto.*;
import com.c1837njavareact.backend.model.enums.ProyectoRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Set;


public interface ProyectoService {
  ProyectoDtoRes create(ProyectoDtoReq proyecto);
  ProyectoDetailedDto getById(int id);
  Page<ProyectoDtoRes> getAll(Pageable pageable);
  ProyectoDtoRes update(ProyectoDtoReq proyecto, int id);
  void deleteById(int id);
  ProyectoDetailedDto updateStatusById(int id, StatusDto status);

  Set<ProyectoDetailedDto> getByOwner(EmailDto email);

  Set<ProyectoDetailedDto> getByCollaborator(EmailDto data);

  Set<ProyectoDtoRes> getByRole(ProyectoRole role);
}