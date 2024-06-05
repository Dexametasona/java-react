package com.c1837njavareact.backend.model.mappers;

import com.c1837njavareact.backend.model.dto.CollaboratorDtoReq;
import com.c1837njavareact.backend.model.dto.CollaboratorDtoRes;
import com.c1837njavareact.backend.model.entities.Collaborator;
import com.c1837njavareact.backend.model.entities.JoinRequest;
import com.c1837njavareact.backend.model.entities.Proyecto;
import com.c1837njavareact.backend.model.entities.UserEntity;
import com.c1837njavareact.backend.model.persistence.ProyectoRepository;
import com.c1837njavareact.backend.model.persistence.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CollaboratorMapper {

  @Mapping(source = "proyecto", target = "proyecto")
  @Mapping(source = "user", target = "user")
  Collaborator dtoReqToCollaborators(CollaboratorDtoReq dto);

  @Mapping(target = "userName", source = "user.userName")
  @Mapping(target = "userId", source = "user.id")
  CollaboratorDtoRes collaboratorToDtoRes(Collaborator collaborator);

  @Mapping(target = "user", source = "userOrigin")
  @Mapping(target = "proyecto", source = "proyectoTarget")
  @Mapping(target = "proyectoRole", constant = "COLLABORATOR")
  @Mapping(target = "id", ignore = true)
  Collaborator joinRequestToCollaborator(JoinRequest joinRequest,
                                         @Context UserRepository userRepository,
                                         @Context ProyectoRepository proyectoRepository);

  default UserEntity map (int id, @Context UserRepository userRepository){
    return userRepository.findById(id).orElseThrow(
            ()->new EntityNotFoundException("Usuario no encontrado, id:"+id));
  }

  default Proyecto map(int id, @Context ProyectoRepository proyectoRepository){
    return proyectoRepository.findById(id).orElseThrow(
            ()->new EntityNotFoundException("Proyecto no encontrado, id:"+id));
  }
}