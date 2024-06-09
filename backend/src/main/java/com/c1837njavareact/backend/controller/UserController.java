package com.c1837njavareact.backend.controller;

import com.c1837njavareact.backend.model.dto.EmailDto;
import com.c1837njavareact.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/user")
public class UserController {
  private final UserService userService;

  @PostMapping
  public ResponseEntity<?> getById(@RequestBody EmailDto emailDto){
    return ResponseEntity.ok(this.userService.getByEmail(emailDto));
  }
  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteById(@PathVariable int id){
    this.userService.deleteById(id);
    return ResponseEntity.ok("Elemento con id: "+id+" eliminado con éxito;");
  }
//  @GetMapping()
//  public ResponseEntity<?> getAll(){
//    return ResponseEntity.ok(this.userService.getAll());
//  }
}
