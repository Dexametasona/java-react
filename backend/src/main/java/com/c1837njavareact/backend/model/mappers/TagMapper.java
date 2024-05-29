package com.c1837njavareact.backend.model.mappers;

import com.c1837njavareact.backend.model.dto.TagDtoReq;
import com.c1837njavareact.backend.model.dto.TagDtoRes;
import com.c1837njavareact.backend.model.entities.Tag;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.Set;

@Mapper(componentModel = "spring")
public interface TagMapper {
//  TagMapper INSTANCE = Mappers.getMapper(TagMapper.class);

  TagDtoRes tagToDtoRes(Tag tag);
  Tag dtoReqToTag(TagDtoReq tagDtoReq);

  Set<TagDtoRes> listTagToDtoRes(Set<Tag> tags);
}
