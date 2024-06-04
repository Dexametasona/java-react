package com.c1837njavareact.backend.service.impl;

import com.c1837njavareact.backend.model.dto.JoinRequestDtoReq;
import com.c1837njavareact.backend.model.dto.JoinRequestDtoRes;
import com.c1837njavareact.backend.model.mappers.JoinMapper;
import com.c1837njavareact.backend.model.persistence.JoinRepository;
import com.c1837njavareact.backend.model.persistence.ProyectoRepository;
import com.c1837njavareact.backend.model.persistence.UserRepository;
import com.c1837njavareact.backend.service.JoinService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JoinServiceImpl implements JoinService {
  private final JoinRepository joinRepo;
  private final JoinMapper joinMapper;
  private final UserRepository userRepo;
  private final ProyectoRepository proyectoRepo;

  @Override
  public JoinRequestDtoRes create(JoinRequestDtoReq joinRequestDto) {
    var newJoinRequest = joinMapper.dtoReqToJoinRequest(joinRequestDto, proyectoRepo, userRepo);
    var joinRequestSaved = joinRepo.save(newJoinRequest);
    return joinMapper.joinRequestToDtoReqFromOrigin(joinRequestSaved);
  }

  @Override
  public List<JoinRequestDtoRes> getJoinRequestByProyecto(int proyectoId) {
    var joinRequests = this.joinRepo.findByProyectoTarget_Id(proyectoId);
    return joinRequests.stream().map(joinMapper::joinRequestToDtoReqFromTarget).toList();
  }

  @Override
  public List<JoinRequestDtoRes> getJoinRequestByUser(int userId) {
    var joinRequests = this.joinRepo.findByUserTarget_Id(userId);
    return joinRequests.stream().map(joinMapper::joinRequestToDtoReqFromTarget).toList();
  }

  @Override
  public void deleteById(int id) {
    if (this.joinRepo.existsById(id)) {
      this.joinRepo.deleteById(id);
    }
    throw new EntityNotFoundException("solicitud con id:"+id+" no encontrado.");
  }
}
