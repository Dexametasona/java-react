package com.c1837njavareact.backend.service.impl;

import com.c1837njavareact.backend.model.dto.StackDtoReq;
import com.c1837njavareact.backend.model.dto.StackDtoRes;
import com.c1837njavareact.backend.model.entities.Stack;
import com.c1837njavareact.backend.model.mappers.StackMapper;
import com.c1837njavareact.backend.model.persistence.StackRepository;
import com.c1837njavareact.backend.service.StackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RequiredArgsConstructor
@Service
public class StackServiceImpl implements StackService {
  private final StackRepository stackRepo;
  private final StackMapper stackMapper;

  @Override
  public StackDtoRes create(StackDtoReq stack) {
    Stack saved = stackRepo.save(this.stackMapper.dtoReqToStack(stack));
    return stackMapper.stackToDtoRes(saved);
  }

  @Override
  public List<StackDtoRes> getAll() {
    var stacks = this.stackRepo.findAll();
    return stackMapper.listStackToDtoRes(stacks);
  }

  @Override
  public StackDtoRes getById(int id) {
    var stackFound = this.stackRepo.findById(id);
    if(stackFound.isEmpty()){
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró el stack con id: "+id);
    }
    return stackMapper.stackToDtoRes(stackFound.get());
  }

  @Override
  public void deleteById(int id) {
    var stackFound = this.stackRepo.findById(id);
    if(stackFound.isEmpty()){
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No se encontró el stack con id: "+id);
    }
    this.stackRepo.delete(stackFound.get());
  }
}
