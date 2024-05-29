package com.c1837njavareact.backend.service;

import com.c1837njavareact.backend.model.dto.TagDtoReq;
import com.c1837njavareact.backend.model.dto.TagDtoRes;

import java.util.Set;

public interface TagService {
  TagDtoRes create(TagDtoReq tagDtoReq);
  Set<TagDtoRes> getAll();
  TagDtoRes updateById(TagDtoReq tagDtoReq, int id);
  TagDtoRes getById(int id);
  void deleteById(int id);
}
