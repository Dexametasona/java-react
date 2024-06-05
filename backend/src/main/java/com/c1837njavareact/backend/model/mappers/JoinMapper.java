package com.c1837njavareact.backend.model.mappers;

import com.c1837njavareact.backend.model.dto.JoinRequestDtoReq;
import com.c1837njavareact.backend.model.dto.JoinRequestDtoRes;
import com.c1837njavareact.backend.model.entities.JoinRequest;
import com.c1837njavareact.backend.model.entities.Proyecto;
import com.c1837njavareact.backend.model.persistence.ProyectoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface JoinMapper {
  JoinRequest dtoReqToJoinRequest(JoinRequestDtoReq joinRequestDto,
                                  @Context ProyectoRepository proyectoRepo);

  @Mapping(target = "user", source = "userTarget.email")
  @Mapping(target = "proyectoTarget", source = "proyectoTarget.name")
  JoinRequestDtoRes joinRequestToDtoReqFromOrigin(JoinRequest joinRequest);

  @Mapping(target = "user", source = "userOrigin.email")
  @Mapping(target = "proyectoTarget", source = "proyectoTarget.name")
  JoinRequestDtoRes joinRequestToDtoReqFromTarget(JoinRequest joinRequest);

//  default UserEntity map(int userId, @Context UserRepository userRepo){
//    return userRepo.findById(userId).orElseThrow(
//            ()->new EntityNotFoundException("Usuario con id: "+userId+" no encontrado.")
//    );
//  }

  default Proyecto map(int proyectoId, @Context ProyectoRepository proyectoRepo){
    return proyectoRepo.findById(proyectoId).orElseThrow(
            ()->new EntityNotFoundException(("Proyecto con id:"+proyectoId+" no encontrado."))
    );
  }
}
