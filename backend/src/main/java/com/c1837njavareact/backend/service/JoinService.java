package com.c1837njavareact.backend.service;

import com.c1837njavareact.backend.model.dto.JoinRequestDtoReq;
import com.c1837njavareact.backend.model.dto.JoinRequestDtoRes;
import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.Set;

public interface JoinService {

  JoinRequestDtoRes create(JoinRequestDtoReq joinRequestDto);
  List<JoinRequestDtoRes> getJoinRequestByProyecto(int proyecto);
  List<JoinRequestDtoRes> getJoinRequestByUser(int ownerId);

  Set<JoinRequestDtoRes> getJoinRequestOfCurrentUser();

  void deleteById(int id);
  void acceptRequest(int idRequest) throws EntityNotFoundException;
  void rejectRequest(int idRequest);

  void cancelRequest(int idRequest);
}
