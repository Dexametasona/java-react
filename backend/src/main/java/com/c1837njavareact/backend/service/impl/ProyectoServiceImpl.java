package com.c1837njavareact.backend.service.impl;

import com.c1837njavareact.backend.model.dto.ProyectoDtoReq;
import com.c1837njavareact.backend.model.dto.ProyectoDtoRes;
import com.c1837njavareact.backend.model.entities.Proyecto;
import com.c1837njavareact.backend.model.entities.Stack;
import com.c1837njavareact.backend.model.mappers.ProyectoMapper;
import com.c1837njavareact.backend.model.persistence.ProyectoRepository;
import com.c1837njavareact.backend.model.persistence.StackRepository;
import com.c1837njavareact.backend.service.ProyectoService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class ProyectoServiceImpl implements ProyectoService {
  private final ProyectoRepository proyectoRepo;
  private final StackRepository stackRepo;

  @Override
  @Transactional
  public ProyectoDtoRes create(ProyectoDtoReq proyecto) {
    var newProyecto = new Proyecto();
    newProyecto.setName(proyecto.name());
    newProyecto.setDescription(proyecto.description());
    Set<Stack> stacks = new HashSet<>();
    for(int id: proyecto.stacks()){
      Stack stack = stackRepo.findById(id).orElseThrow(
              ()->new EntityNotFoundException("id de stack no encontrado: "+id));
      stacks.add(stack);
    };
    newProyecto.setStacks(stacks);
    var saved = this.proyectoRepo.save(newProyecto);
    return ProyectoMapper.INSTANCE.toDto(saved);
  }

  @Override
  public ProyectoDtoRes getById(int id) {
    Proyecto proyecto  = this.proyectoRepo.findById(id).orElseThrow(
            ()->new EntityNotFoundException("proyecto no encontrado, id: " + id));
    return ProyectoMapper.INSTANCE.toDto(proyecto);
  }

  @Override
  public List<ProyectoDtoRes> getAll() {
    List<Proyecto> proyectos = this.proyectoRepo.findAll();
    return ProyectoMapper.INSTANCE.toDtoList(proyectos);
  }

  @Override
  public ProyectoDtoRes update(ProyectoDtoReq proyecto, int id) {
    Proyecto newProyecto  = this.proyectoRepo.findById(id).orElseThrow(
            ()->new EntityNotFoundException("proyecto no encontrado, id: " + id));
    newProyecto.setName(proyecto.name());
    newProyecto.setDescription(proyecto.description());
    Set<Stack> stacks = new HashSet<>();
    for(int id_stack: proyecto.stacks()){
      Stack stack = stackRepo.findById(id_stack).orElseThrow(
              ()->new EntityNotFoundException("id de stack no encontrado: "+id));
      stacks.add(stack);
    };
    newProyecto.setStacks(stacks);
    var udpatedProyecto = this.proyectoRepo.save(newProyecto);
    return ProyectoMapper.INSTANCE.toDto(udpatedProyecto);
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
