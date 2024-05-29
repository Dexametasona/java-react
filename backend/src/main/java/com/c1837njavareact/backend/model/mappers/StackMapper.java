package com.c1837njavareact.backend.model.mappers;

import com.c1837njavareact.backend.model.dto.StackDtoReq;
import com.c1837njavareact.backend.model.dto.StackDtoRes;
import com.c1837njavareact.backend.model.entities.Stack;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.Set;

@Mapper(componentModel = "spring")
public interface StackMapper {
//  StackMapper INSTANCE = Mappers.getMapper(StackMapper.class);

  Stack dtoResToStack(StackDtoRes stackDtoRes);
  StackDtoRes stackToDtoRes(Stack stack);

  Stack dtoReqToStack(StackDtoReq stackDtoReq);
  StackDtoReq stackToDtoReq(Stack stack);
  List<StackDtoRes> listStackToDtoRes(List<Stack> stacks);
  Set<StackDtoRes> setStackToDtoRes(Set<Stack> stacks);
}
