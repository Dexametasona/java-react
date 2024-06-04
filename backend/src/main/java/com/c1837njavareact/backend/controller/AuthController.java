package com.c1837njavareact.backend.controller;

import com.c1837njavareact.backend.model.dto.LoginDtoReq;
import com.c1837njavareact.backend.model.dto.UserDtoReq;
import com.c1837njavareact.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.base-path}/auth")
@Slf4j
public class AuthController {
  private final AuthService authService;

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody @Valid LoginDtoReq user){
    return ResponseEntity.ok(this.authService.login(user));
  }
  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody @Valid UserDtoReq user){
    log.info(user.userName()+"----------------------------");
    return ResponseEntity.status(HttpStatus.CREATED).body(this.authService.register(user));
  }
}
