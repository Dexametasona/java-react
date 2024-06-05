package com.c1837njavareact.backend.service.impl;

import com.c1837njavareact.backend.model.dto.JoinRequestDtoReq;
import com.c1837njavareact.backend.model.dto.JoinRequestDtoRes;
import com.c1837njavareact.backend.model.entities.JoinRequest;
import com.c1837njavareact.backend.model.entities.Proyecto;
import com.c1837njavareact.backend.model.entities.UserEntity;
import com.c1837njavareact.backend.model.enums.ProyectoRole;
import com.c1837njavareact.backend.model.mappers.CollaboratorMapper;
import com.c1837njavareact.backend.model.mappers.JoinMapper;
import com.c1837njavareact.backend.model.persistence.CollaboratorRepository;
import com.c1837njavareact.backend.model.persistence.JoinRepository;
import com.c1837njavareact.backend.model.persistence.ProyectoRepository;
import com.c1837njavareact.backend.model.persistence.UserRepository;
import com.c1837njavareact.backend.service.JoinService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JoinServiceImpl implements JoinService {
  private final JoinRepository joinRepo;
  private final JoinMapper joinMapper;
  private final UserRepository userRepo;
  private final ProyectoRepository proyectoRepo;
  private final CollaboratorRepository collaboratorRepo;
  private final CollaboratorMapper collaboratorMapper;

  @Override
  public JoinRequestDtoRes create(JoinRequestDtoReq joinRequestDto) {
    var newJoinRequest = joinMapper.dtoReqToJoinRequest(joinRequestDto, proyectoRepo);
    newJoinRequest.setUserOrigin(this.extractUserFromToken());
    newJoinRequest.setUserTarget(this.extractUserOwnerFromProject(newJoinRequest.getProyectoTarget()));
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
      return;
    }
    throw new EntityNotFoundException("solicitud con id:" + id + " no encontrado.");
  }

  @Override
  public void acceptRequest(int idRequest) {
    var joinRequest = this.joinRepo.findById(idRequest);
    if (joinRequest.isPresent()) {
      var newCollaborator = this.collaboratorMapper.joinRequestToCollaborator(
              joinRequest.get(), userRepo, proyectoRepo);
      if (verifyUserInTokenMatchRequest(joinRequest.get())) {
        this.collaboratorRepo.save(newCollaborator);
        this.deleteById(idRequest);
        return;
      }
      throw new RuntimeException("Permisos insuficientes para responder esta solicitud.");
    }
    throw new EntityNotFoundException("Solicitud no encontrada, id:" + idRequest);
  }

  @Override
  public void rejectRequest(int idRequest) {
    var joinRequest = this.joinRepo.findById(idRequest);
    if (joinRequest.isPresent()) {
      if (verifyUserInTokenMatchRequest(joinRequest.get())) {
        this.deleteById(idRequest);
        return;
      }
      throw new RuntimeException("Permisos insuficientes para denegar esta solicitud.");
    }
    throw new EntityNotFoundException("Solicitud no encontrada, id:" + idRequest);
  }

  private boolean verifyUserInTokenMatchRequest(JoinRequest request) {
    var user = extractUserFromToken();
    return user.getEmail().equals(request.getUserTarget().getEmail());
  }

  private UserEntity extractUserFromToken() {
    var ownerEmail = SecurityContextHolder.getContext().getAuthentication().getName();
    return userRepo.findByEmail(ownerEmail).orElseThrow(
            () -> new EntityNotFoundException("Usuario no encontrado, email: " + ownerEmail));
  }

  private UserEntity extractUserOwnerFromProject(Proyecto proyecto) {
    var collaborator = proyecto.getCollaborators()
            .stream().filter(col -> col.getProyectoRole() == ProyectoRole.OWNER)
            .findFirst().orElseThrow(
                    () -> new RuntimeException("no se encontró al dueño del proyecto con id:" + proyecto.getId()));
    return collaborator.getUser();
  }
}