package com.c1837njavareact.backend.service.impl;

import com.c1837njavareact.backend.model.dto.TagDtoReq;
import com.c1837njavareact.backend.model.dto.TagDtoRes;
import com.c1837njavareact.backend.model.mappers.TagMapper;
import com.c1837njavareact.backend.model.persistence.TagRepository;
import com.c1837njavareact.backend.service.TagService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class TagServiceImpl implements TagService {
  private final TagRepository tagRepo;
  private final TagMapper tagMapper;

  @Override
  public TagDtoRes create(TagDtoReq tagDtoReq) {
    var tagSaved= this.tagRepo.save(tagMapper.dtoReqToTag(tagDtoReq));
    return tagMapper.tagToDtoRes(tagSaved);
  }

  @Override
  public Set<TagDtoRes> getAll() {
    var tags = new HashSet<>(this.tagRepo.findAll());
    return tagMapper.listTagToDtoRes(tags);
  }

  @Override
  public TagDtoRes updateById(TagDtoReq tagDtoReq, int id) {
    return null;
  }

  @Override
  public TagDtoRes getById(int id) {
    var tagFounded = this.tagRepo.findById(id).orElseThrow(
            ()-> new EntityNotFoundException("Entidad con id: "+id+" no encontrado."));
    return tagMapper.tagToDtoRes(tagFounded);
  }

  @Override
  public void deleteById(int id) {
    var tagFounded = this.tagRepo.findById(id).orElseThrow(
            ()-> new EntityNotFoundException("Entidad con id: "+id+" no encontrado."));
    this.tagRepo.delete(tagFounded);
  }
}
