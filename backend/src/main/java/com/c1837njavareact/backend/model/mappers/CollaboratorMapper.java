package com.c1837njavareact.backend.model.mappers;

import com.c1837njavareact.backend.model.dto.CollaboratorDtoReq;
import com.c1837njavareact.backend.model.dto.CollaboratorDtoRes;
import com.c1837njavareact.backend.model.entities.Collaborator;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CollaboratorMapper {

  @Mapping(source = "proyecto", target = "proyecto")
  @Mapping(source = "user", target = "user")
  @Mapping(source = "role", target = "role")
  Collaborator dtoReqToCollaborators(CollaboratorDtoReq dto);

  @Mapping(target = "username", source = "user.username")
  @Mapping(target = "user_id", source = "user.id")
  CollaboratorDtoRes collaboratorToDtoRes(Collaborator collaborator);
}
