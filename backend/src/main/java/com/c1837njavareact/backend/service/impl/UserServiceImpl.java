package com.c1837njavareact.backend.service.impl;

import com.c1837njavareact.backend.model.dto.EmailDto;
import com.c1837njavareact.backend.model.dto.UserDtoReq;
import com.c1837njavareact.backend.model.dto.UserDtoRes;
import com.c1837njavareact.backend.model.mappers.UserMapper;
import com.c1837njavareact.backend.model.persistence.StackRepository;
import com.c1837njavareact.backend.model.persistence.UserRepository;
import com.c1837njavareact.backend.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
  private final UserRepository userRepo;
  private final StackRepository stackRepo;
  private final UserMapper userMapper;


  @Override
  public UserDtoRes getByEmail(EmailDto emailDto) {
    var userFounded = this.userRepo.findByEmail(emailDto.email()).orElseThrow(
            () -> new EntityNotFoundException("usuario no encontrado, email:" + emailDto.email()));
    return userMapper.userToDtoRes(userFounded);
  }

  @Transactional
  @Override
  public Set<UserDtoRes> getAll() {
    var users = this.userRepo.findAll();
    return users.stream().map(userMapper::userToDtoRes).collect(Collectors.toSet());
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
