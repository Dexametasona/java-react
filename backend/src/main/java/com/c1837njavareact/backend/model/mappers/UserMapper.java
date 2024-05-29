package com.c1837njavareact.backend.model.mappers;

import com.c1837njavareact.backend.model.dto.UserDtoReq;
import com.c1837njavareact.backend.model.dto.UserDtoRes;
import com.c1837njavareact.backend.model.entities.Stack;
import com.c1837njavareact.backend.model.entities.UserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;
import java.util.Set;


@Mapper(componentModel = "spring")
public interface UserMapper {

  @Mapping(target = "stacks", source = "stack")
  UserEntity dtoReqToUser(UserDtoReq userDtoReq, Set<Stack> stack);

  @Mapping(target = "stacks", source = "stacks")
  UserDtoRes userToDtoRes(UserEntity user);

  List<UserDtoRes> listUserToDto(List<UserEntity> users);

  @Mapping(target = "previous.stacks", source = "stacks")
  void updateUser(UserDtoReq current, Set<Stack> stacks, @MappingTarget UserEntity previous);
}
