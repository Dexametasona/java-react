package com.c1837njavareact.backend.service.impl;

import com.c1837njavareact.backend.model.dto.UserDtoReq;
import com.c1837njavareact.backend.model.dto.UserDtoRes;
import com.c1837njavareact.backend.model.entities.UserEntity;
import com.c1837njavareact.backend.model.mappers.UserMapper;
import com.c1837njavareact.backend.model.persistence.StackRepository;
import com.c1837njavareact.backend.model.persistence.UserRepository;
import com.c1837njavareact.backend.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
  private final UserRepository userRepo;
  private final StackRepository stackRepo;
  private final UserMapper userMapper;


  @Override
  public UserDtoRes getById(int id) {
    var userFounded = this.userRepo.findById(id).orElseThrow(
            () -> new EntityNotFoundException("usuario no encontrado, id:" + id));
    return userMapper.userToDtoRes(userFounded);
  }

  @Override
  public UserDtoRes updateById(UserDtoReq user, int id) {
    var userFounded = this.userRepo.findById(id).orElseThrow(
            () -> new EntityNotFoundException("usuario no encontrado, id:" + id));
    var stacks = new HashSet<>(stackRepo.findAllById(user.stacks()));

    userMapper.updateUser( user, stacks, userFounded);
    var userUpdated = this.userRepo.save(userFounded);
    return userMapper.userToDtoRes(userUpdated);
  }

  @Override
  public void deleteById(int id) {
    if(this.userRepo.existsById(id)){
      this.userRepo.deleteById(id);
    }
  }
}
