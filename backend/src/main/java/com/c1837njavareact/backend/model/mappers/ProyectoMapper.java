package com.c1837njavareact.backend.model.mappers;

import com.c1837njavareact.backend.model.dto.ProyectoDtoReq;
import com.c1837njavareact.backend.model.dto.ProyectoDtoRes;
import com.c1837njavareact.backend.model.entities.Proyecto;
import com.c1837njavareact.backend.model.entities.Stack;
import com.c1837njavareact.backend.model.entities.Tag;
import com.c1837njavareact.backend.model.persistence.StackRepository;
import com.c1837njavareact.backend.model.persistence.TagRepository;
import jakarta.persistence.EntityNotFoundException;
import org.mapstruct.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring", uses =  CollaboratorMapper.class)
public interface ProyectoMapper {

  @Mapping(target = "stacks", source = "stacks")
  @Mapping(target = "tag", source = "tagId")
  @Mapping(target = "status", expression = "java(Status.ON_HOLD)")
  Proyecto dtoReqToProyecto(ProyectoDtoReq proyectoDtoReq,
                            @Context StackRepository stackRepository,
                            @Context TagRepository tagRepository);

  @Mapping(target = "collaborators", source = "collaborators")
  @Mapping(target = "createdAt", source = "createdAt", dateFormat = "dd-MM-yyyy HH:mm:ss")
  @Mapping(target = "status", source = "status")
  ProyectoDtoRes proyectoToDtoRes(Proyecto proyecto);

  List<ProyectoDtoRes> listProyectoToDtoRes(List<Proyecto> proyectos);

  default Set<Stack> map (List<Integer> stacks, @Context StackRepository stackRepo){
    return new HashSet<>(stackRepo.findAllById(stacks));
  }

  default Tag map (int tagId, @Context TagRepository tagRepository){
    return tagRepository.findById(tagId).orElseThrow(
            ()-> new EntityNotFoundException("tag no encontrado, id:" + tagId));
  }
}
