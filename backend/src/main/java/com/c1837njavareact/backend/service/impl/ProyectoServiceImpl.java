package com.c1837njavareact.backend.service.impl;

import com.c1837njavareact.backend.model.dto.*;
import com.c1837njavareact.backend.model.entities.Collaborator;
import com.c1837njavareact.backend.model.entities.Proyecto;
import com.c1837njavareact.backend.model.enums.ProyectoRole;
import com.c1837njavareact.backend.model.mappers.CollaboratorMapper;
import com.c1837njavareact.backend.model.mappers.ProyectoMapper;
import com.c1837njavareact.backend.model.persistence.*;
import com.c1837njavareact.backend.service.ProyectoService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Slf4j
public class ProyectoServiceImpl implements ProyectoService {
  private final ProyectoRepository proyectoRepo;
  private final StackRepository stackRepo;
  private final TagRepository tagRepo;
  private final CollaboratorRepository collaboratorRepo;
  private final UserRepository userRepo;
  private final ProyectoMapper proyectoMapper;
  private final CollaboratorMapper collaboratorMapper;

  @Override
  @Transactional
  public ProyectoDtoRes create(ProyectoDtoReq proyecto) {
    var newProyecto = proyectoMapper.dtoReqToProyecto(proyecto,stackRepo,tagRepo);
    newProyecto.setCollaborators(this.generateOwner(newProyecto));
    var proyectoSaved = this.proyectoRepo.save(newProyecto);
    return proyectoMapper.proyectoToDtoRes(proyectoSaved);
  }

  @Override
  public ProyectoDetailedDto getById(int id) {
    Proyecto proyecto  = this.proyectoRepo.findById(id).orElseThrow(
            ()->new EntityNotFoundException("proyecto no encontrado, id: " + id));
    return proyectoMapper.proyectoToProyectoDetailed(proyecto);
  }

  @Override
  public Page<ProyectoDtoRes> getAll(Pageable pageable) {
    var proyectos = this.proyectoRepo.findAll(pageable);
    var pacientesDto = proyectos.getContent()
            .stream()
            .map(proyectoMapper::proyectoToDtoRes)
            .toList();
    return new PageImpl<>(pacientesDto, pageable, proyectos.getTotalElements());
  }

  @Override
  public ProyectoDtoRes update(ProyectoDtoReq proyecto, int id) {
    return null;
  }

  @Override
  public void deleteById(int id) {
    if(this.proyectoRepo.existsById(id)){
      this.proyectoRepo.deleteById(id);
    }else {
     throw new EntityNotFoundException("Proyecto no encontrado id "+ id);
    }
  }

  @Override
  public ProyectoDetailedDto updateStatusById(int id, StatusDto status) {
    if(this.proyectoRepo.existsById(id)){
      this.proyectoRepo.updateStatusById(id, status.status());
      return this.getById(id);
    }
    throw new EntityNotFoundException("proyecto no encontrado, id:"+id);
  }

  @Override
  public Set<ProyectoDetailedDto> getByOwner(EmailDto data) {
    var proyectos = proyectoRepo.findByCollaborators_User_EmailAndCollaborators_ProyectoRole(
            data.email(), ProyectoRole.OWNER);
    return proyectos.stream()
            .map(proyectoMapper::proyectoToProyectoDetailed)
            .collect(Collectors.toSet());
  }

  @Override
  public Set<ProyectoDetailedDto> getByCollaborator(EmailDto data) {
    var proyectos = proyectoRepo.findByCollaborators_User_EmailAndCollaborators_ProyectoRoleNot(
            data.email(), ProyectoRole.OWNER);
    return proyectos.stream()
            .map(proyectoMapper::proyectoToProyectoDetailed)
            .collect(Collectors.toSet());
  }

  @Override
  public Set<ProyectoDtoRes> getByRole(ProyectoRole role) {
    var proyectos = proyectoRepo.findByPositions_ProyectoRole(role);
    return proyectos.stream()
            .map(proyectoMapper::proyectoToDtoRes)
            .collect(Collectors.toSet());
  }

  private Set<Collaborator> generateOwner(Proyecto proyecto){
    var ownerEmail = SecurityContextHolder.getContext().getAuthentication().getName();
    var user = userRepo.findByEmail(ownerEmail).orElseThrow(
            ()->new EntityNotFoundException("Usuario no encontrado, email: "+ownerEmail));
    var owner = new Collaborator();
    owner.setUser(user);
    owner.setProyecto(proyecto);
    owner.setProyectoRole(ProyectoRole.OWNER);
    return Set.of(owner);
  }
}
