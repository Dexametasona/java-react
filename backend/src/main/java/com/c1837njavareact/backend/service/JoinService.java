package com.c1837njavareact.backend.service;

import com.c1837njavareact.backend.model.dto.JoinRequestDtoReq;
import com.c1837njavareact.backend.model.dto.JoinRequestDtoRes;

import java.util.List;

public interface JoinService {

  JoinRequestDtoRes create(JoinRequestDtoReq joinRequestDto);
  List<JoinRequestDtoRes> getJoinRequestByProyecto(int proyecto);
  List<JoinRequestDtoRes> getJoinRequestByUser(int ownerId);
  void deleteById(int id);

}
