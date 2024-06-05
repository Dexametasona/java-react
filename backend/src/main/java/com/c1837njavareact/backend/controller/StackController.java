package com.c1837njavareact.backend.controller;

import com.c1837njavareact.backend.model.dto.StackDtoReq;
import com.c1837njavareact.backend.service.StackService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/stack")
@RequiredArgsConstructor
public class StackController {
  private final StackService stackService;

  @PostMapping
  public ResponseEntity<?> saveStack(@RequestBody @Valid StackDtoReq stack){
    return ResponseEntity.status(HttpStatus.CREATED).body(this.stackService.create(stack));
  }

  @GetMapping
  public ResponseEntity<?> findAll(){
    return ResponseEntity.ok().body(this.stackService.getAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> findById(@PathVariable int id){
    return ResponseEntity.ok().body(this.stackService.getById(id));
  }
  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteById(@PathVariable int id){
    this.stackService.deleteById(id);
    return ResponseEntity.ok("Elemento eliminado con éxito.");
  }
}
