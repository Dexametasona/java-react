package com.c1837njavareact.backend.service.impl;

import com.c1837njavareact.backend.exceptions.EmailAlreadyExistException;
import com.c1837njavareact.backend.model.dto.*;
import com.c1837njavareact.backend.model.entities.UserEntity;
import com.c1837njavareact.backend.model.enums.Role;
import com.c1837njavareact.backend.model.mappers.UserMapper;
import com.c1837njavareact.backend.model.persistence.StackRepository;
import com.c1837njavareact.backend.model.persistence.UserRepository;
import com.c1837njavareact.backend.service.AuthService;
import com.c1837njavareact.backend.service.JwtService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
  private final UserMapper userMapper;
  private final UserRepository userRepo;
  private final StackRepository stackRepo;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;

  @Override
  @Transactional
  public registerDtoRes register(UserDtoReq user) {
      if(this.userRepo.existsByEmail(user.email())){
        throw new EmailAlreadyExistException("Email: "+user.email()+" ya está registrado.");
      }
      UserEntity newUser = userMapper.dtoReqToUser(user, stackRepo);
      newUser.setRole(Role.ADMIN);
      newUser.setPassword(passwordEncoder.encode(user.password()));
      var userRegistered = userMapper.userToDtoRes(this.userRepo.save(newUser));
      return new registerDtoRes(userRegistered, "Nuevo usuario registrado con éxito.");
  }

  @Override
  public LoginDtoRes login(LoginDtoReq request) {
    System.out.println("comunismo");
    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
    var userDetail = userRepo.findByEmail(request.email()).orElseThrow(
            ()->new EntityNotFoundException("usuario no encontrado, email: "+request.email()));
    String token = jwtService.getToken(userDetail);
    return new LoginDtoRes(token, "Sesión iniciado con éxito");
  }
}
