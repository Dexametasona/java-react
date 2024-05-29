package com.c1837njavareact.backend.model.mappers;

import com.c1837njavareact.backend.model.dto.TagDtoReq;
import com.c1837njavareact.backend.model.dto.TagDtoRes;
import com.c1837njavareact.backend.model.entities.Tag;
import org.mapstruct.Mapper;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface TagMapper {

  TagDtoRes tagToDtoRes(Tag tag);
  Tag dtoReqToTag(TagDtoReq tagDtoReq);

  Set<TagDtoRes> listTagToDtoRes(Set<Tag> tags);
}
