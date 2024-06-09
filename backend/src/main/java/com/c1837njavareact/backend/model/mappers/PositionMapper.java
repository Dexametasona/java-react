package com.c1837njavareact.backend.model.mappers;

import com.c1837njavareact.backend.model.dto.PositionDtoReq;
import com.c1837njavareact.backend.model.dto.PositionDtoRes;
import com.c1837njavareact.backend.model.entities.Position;
import com.c1837njavareact.backend.model.entities.Proyecto;
import com.c1837njavareact.backend.model.persistence.ProyectoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PositionMapper {

  @Mapping(target = "proyecto", source = "idProyecto")
  Position dtoReqToPosition(PositionDtoReq positionDtoReq,
                            @Context ProyectoRepository proyectoRepository);

  PositionDtoRes positionToDtoRes(Position position);

  default Proyecto map (int proyecto_id,
                        @Context ProyectoRepository proyectoRepository){
    return proyectoRepository.findById(proyecto_id).orElseThrow(
            ()->new EntityNotFoundException("Proyecto no encontrado, id:"+proyecto_id));
  }
}
