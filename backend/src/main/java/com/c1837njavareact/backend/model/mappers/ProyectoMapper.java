package com.c1837njavareact.backend.model.mappers;

import com.c1837njavareact.backend.model.dto.ProyectoDetailedDto;
import com.c1837njavareact.backend.model.dto.ProyectoDtoReq;
import com.c1837njavareact.backend.model.dto.ProyectoDtoRes;
import com.c1837njavareact.backend.model.entities.*;
import com.c1837njavareact.backend.model.enums.ProyectoRole;
import com.c1837njavareact.backend.model.persistence.StackRepository;
import com.c1837njavareact.backend.model.persistence.TagRepository;
import jakarta.persistence.EntityNotFoundException;
import org.mapstruct.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring", uses = {CollaboratorMapper.class,
        StackMapper.class,
        JoinMapper.class,
        PositionMapper.class
})
public interface ProyectoMapper {

  @Mapping(target = "stacks", source = "stacks")
  @Mapping(target = "tag", source = "tagId")
  @Mapping(target = "status", expression = "java(Status.ON_HOLD)")
  Proyecto dtoReqToProyecto(ProyectoDtoReq proyectoDtoReq,
                            @Context StackRepository stackRepository,
                            @Context TagRepository tagRepository);

  @Mapping(target = "status", source = "status")
  @Mapping(target = "owner", source = "collaborators")
  ProyectoDtoRes proyectoToDtoRes(Proyecto proyecto);

  @Mapping(target = "joinRequests", source = "joinRequests", qualifiedByName = "fromReceiver")
  ProyectoDetailedDto proyectoToProyectoDetailed(Proyecto proyecto);

  List<ProyectoDtoRes> listProyectoToDtoRes(List<Proyecto> proyectos);

  default Set<Stack> map (List<Integer> stacks, @Context StackRepository stackRepo){
    return new HashSet<>(stackRepo.findAllById(stacks));
  }

  default Tag map (int tagId, @Context TagRepository tagRepository){
    return tagRepository.findById(tagId).orElseThrow(
            ()-> new EntityNotFoundException("tag no encontrado, id:" + tagId));
  }

  default String map(Set<Collaborator> collaborators){
    var collaborator = collaborators.stream()
            .filter(col->col.getProyectoRole() == ProyectoRole.OWNER)
            .findFirst()
            .orElseThrow(()->new RuntimeException("Proyecto invalido, no tiene Dueño."));
    return collaborator.getUser().getUserName();
  }

  default int map(List<JoinRequest> joinRequests){
    return joinRequests != null ? joinRequests.size():0;
  }
}
