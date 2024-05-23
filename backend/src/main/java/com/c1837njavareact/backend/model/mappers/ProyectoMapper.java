package com.c1837njavareact.backend.model.mappers;

import com.c1837njavareact.backend.model.dto.ProyectoDtoRes;
import com.c1837njavareact.backend.model.entities.Proyecto;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface ProyectoMapper {
  ProyectoMapper INSTANCE = Mappers.getMapper(ProyectoMapper.class);
  @Mapping(target = "id", source = "id")
  ProyectoDtoRes toDto(Proyecto proyecto);

  List<ProyectoDtoRes> toDtoList(List<Proyecto> proyectos);
}
