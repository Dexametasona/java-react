package com.c1837njavareact.backend.service.impl;

import com.c1837njavareact.backend.model.dto.PositionDtoReq;
import com.c1837njavareact.backend.model.dto.PositionDtoRes;
import com.c1837njavareact.backend.model.mappers.PositionMapper;
import com.c1837njavareact.backend.model.persistence.PositionRepository;
import com.c1837njavareact.backend.model.persistence.ProyectoRepository;
import com.c1837njavareact.backend.service.PositionService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class PositionServiceImpl implements PositionService {
  private final PositionRepository positionRepo;
  private final PositionMapper positionMapper;
  private final ProyectoRepository proyectoRepository;

  @Override
  public PositionDtoRes create(PositionDtoReq positionDtoReq) {
    var position = this.positionMapper.dtoReqToPosition(positionDtoReq, proyectoRepository);
    var positionSaved = this.positionRepo.save(position);
    return this.positionMapper.positionToDtoRes(positionSaved);
  }

  @Override
  public Set<PositionDtoRes> getAll() {
    var positions = this.positionRepo.findAll();
    return positions.stream()
            .map(positionMapper::positionToDtoRes)
            .collect(Collectors.toSet());
  }

  @Override
  public PositionDtoRes getById(int id) {
    return null;
  }

  @Override
  public void deleteById(int id) {
    if(this.positionRepo.existsById(id)){
      this.positionRepo.deleteById(id);
      return;
    }
    throw new EntityNotFoundException("Posición no encontrada, id:"+id);
  }
}
