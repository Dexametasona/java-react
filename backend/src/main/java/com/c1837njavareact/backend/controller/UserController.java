package com.c1837njavareact.backend.controller;

import com.c1837njavareact.backend.model.dto.UserDtoReq;
import com.c1837njavareact.backend.model.dto.UserDtoRes;
import com.c1837njavareact.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/user")
public class UserController {
  private final UserService userService;

  @PostMapping
  public ResponseEntity<?> create(@RequestBody @Valid UserDtoReq user){
    return ResponseEntity.status(HttpStatus.CREATED).body(this.userService.create(user));
  }

  @GetMapping
  public ResponseEntity<List<UserDtoRes>> getAll(){
    return ResponseEntity.ok(this.userService.getAll());
  }
  @GetMapping("/{id}")
  public ResponseEntity<?> getById(@PathVariable int id){
    return ResponseEntity.ok(this.userService.getById(id));
  }
  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteById(@PathVariable int id){
    this.userService.deleteById(id);
    return ResponseEntity.ok("Elemento con id: "+id+" eliminado con éxito;");
  }
}
