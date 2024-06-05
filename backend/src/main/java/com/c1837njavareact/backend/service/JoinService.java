package com.c1837njavareact.backend.service;

import com.c1837njavareact.backend.model.dto.JoinRequestDtoReq;
import com.c1837njavareact.backend.model.dto.JoinRequestDtoRes;
import jakarta.persistence.EntityNotFoundException;

import java.util.List;

public interface JoinService {

  JoinRequestDtoRes create(JoinRequestDtoReq joinRequestDto);
  List<JoinRequestDtoRes> getJoinRequestByProyecto(int proyecto);
  List<JoinRequestDtoRes> getJoinRequestByUser(int ownerId);
  void deleteById(int id);
  void acceptRequest(int idRequest) throws EntityNotFoundException;
  void rejectRequest(int idRequest);
}
