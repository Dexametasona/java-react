package com.c1837njavareact.backend.service;

import com.c1837njavareact.backend.model.dto.ProyectoDtoReq;
import com.c1837njavareact.backend.model.dto.ProyectoDtoRes;

import java.util.List;

public interface ProyectoService {
  ProyectoDtoRes create(ProyectoDtoReq proyecto);
  ProyectoDtoRes getById(int id);
  List<ProyectoDtoRes> getAll();
  ProyectoDtoRes update(ProyectoDtoReq proyecto, int id);
  void deleteById(int id);

}
