package com.c1837njavareact.backend.service;

import com.c1837njavareact.backend.model.dto.ProyectoDetailedDto;
import com.c1837njavareact.backend.model.dto.ProyectoDtoReq;
import com.c1837njavareact.backend.model.dto.ProyectoDtoRes;
import com.c1837njavareact.backend.model.dto.StatusDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface ProyectoService {
  ProyectoDtoRes create(ProyectoDtoReq proyecto);
  ProyectoDetailedDto getById(int id);
  Page<ProyectoDtoRes> getAll(Pageable pageable);
  ProyectoDtoRes update(ProyectoDtoReq proyecto, int id);
  void deleteById(int id);
  ProyectoDetailedDto updateStatusById(int id, StatusDto status);
}