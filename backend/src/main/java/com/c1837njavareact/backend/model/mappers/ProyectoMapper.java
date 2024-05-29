package com.c1837njavareact.backend.model.mappers;

import com.c1837njavareact.backend.model.dto.ProyectoDtoReq;
import com.c1837njavareact.backend.model.dto.ProyectoDtoRes;
import com.c1837njavareact.backend.model.entities.Proyecto;
import com.c1837njavareact.backend.model.entities.Stack;
import com.c1837njavareact.backend.model.entities.Tag;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring", uses =  CollaboratorMapper.class)
public interface ProyectoMapper {
//  ProyectoMapper INSTANCE = Mappers.getMapper(ProyectoMapper.class);

  @Mapping(target = "stacks", source = "stacksSet")
  @Mapping(target = "tag", source = "tag")
  @Mapping(target = "name", source = "proyectoDtoReq.name")
  Proyecto dtoReqToProyecto(ProyectoDtoReq proyectoDtoReq, Set<Stack> stacksSet, Tag tag);

  @Mapping(target = "collaborators", source = "collaborators")
  @Mapping(target = "createdAt", source = "createdAt", dateFormat = "dd-MM-yyyy HH:mm:ss")
  @Mapping(target = "status", source = "status")
  ProyectoDtoRes proyectoToDtoRes(Proyecto proyecto);

  List<ProyectoDtoRes> listProyectoToDtoRes(List<Proyecto> proyectos);

}
