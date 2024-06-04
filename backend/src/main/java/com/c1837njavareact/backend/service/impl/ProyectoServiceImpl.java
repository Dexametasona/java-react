package com.c1837njavareact.backend.service.impl;

import com.c1837njavareact.backend.model.dto.CollaboratorDtoReq;
import com.c1837njavareact.backend.model.dto.ProyectoDtoReq;
import com.c1837njavareact.backend.model.dto.ProyectoDtoRes;
import com.c1837njavareact.backend.model.entities.Proyecto;
import com.c1837njavareact.backend.model.entities.Stack;
import com.c1837njavareact.backend.model.entities.Tag;
import com.c1837njavareact.backend.model.enums.ProyectoRole;
import com.c1837njavareact.backend.model.enums.Status;
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
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

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
    Set<Stack> stacks = new HashSet<>(this.stackRepo.findAllById(proyecto.stacks()));
    Tag tag = this.tagRepo.findById(proyecto.tagId()).orElseThrow(
            ()-> new EntityNotFoundException("tag_id no encontrado."));

    var newProyecto = proyectoMapper.dtoReqToProyecto(proyecto, stacks, tag);
    var proyectoSaved = this.proyectoRepo.save(newProyecto);
    var userOwner = userRepo.findById(proyecto.ownerId()).orElseThrow(
            ()->new EntityNotFoundException("usuario con id: "+proyecto.ownerId()+" no encontrado." ));
    var collaborator = new CollaboratorDtoReq(
            proyectoSaved,
            userOwner,
            ProyectoRole.OWNER);
    var collaboratorSaved = this.collaboratorRepo.save(collaboratorMapper.dtoReqToCollaborators(collaborator));
    proyectoSaved.setCollaborators(Set.of(collaboratorSaved));
    proyectoSaved.setStatus(Status.ON_HOLD);
    return proyectoMapper.proyectoToDtoRes(proyectoSaved);
  }

  @Override
  public ProyectoDtoRes getById(int id) {
    Proyecto proyecto  = this.proyectoRepo.findById(id).orElseThrow(
            ()->new EntityNotFoundException("proyecto no encontrado, id: " + id));
    return proyectoMapper.proyectoToDtoRes(proyecto);
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
}
