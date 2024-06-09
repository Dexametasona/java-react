package com.c1837njavareact.backend.model.mappers;

import com.c1837njavareact.backend.model.dto.UserDtoReq;
import com.c1837njavareact.backend.model.dto.UserDtoRes;
import com.c1837njavareact.backend.model.entities.Stack;
import com.c1837njavareact.backend.model.entities.UserEntity;
import com.c1837njavareact.backend.model.persistence.StackRepository;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Mapper(componentModel = "spring")
public interface UserMapper {

  UserEntity dtoReqToUser(UserDtoReq userDtoReq, @Context StackRepository stackRepo);

  UserDtoRes userToDtoRes(UserEntity user);

  Set<UserDtoRes> listUserToDto(Set<UserEntity> users);

  @Mapping(target = "previous.stacks", source = "stacks")
  void updateUser(UserDtoReq current, Set<Stack> stacks, @MappingTarget UserEntity previous);

  default Set<Stack> map (List<Integer> stacksId, @Context StackRepository stackRepo){
    return new HashSet<>(stackRepo.findAllById(stacksId));
  }
}
