package com.c1837njavareact.backend.controller;

import com.c1837njavareact.backend.model.dto.ProyectoDtoReq;
import com.c1837njavareact.backend.service.ProyectoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/proyecto")
public class ProyectoController {
  private final ProyectoService proyectoService;

  @PostMapping
  public ResponseEntity<?> create(@RequestBody @Valid ProyectoDtoReq proyecto){
    return ResponseEntity.status(HttpStatus.CREATED).body(proyectoService.create(proyecto));
  }

  @GetMapping
  public ResponseEntity<?> getAll(){
    return ResponseEntity.ok(proyectoService.getAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getById(@PathVariable int id){
    return ResponseEntity.ok(this.proyectoService.getById(id));
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> updateById(@PathVariable int id, @RequestBody ProyectoDtoReq proyecto){
    return ResponseEntity.ok(this.proyectoService.update(proyecto, id));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteById(@PathVariable int id){
    this.proyectoService.deleteById(id);
    return ResponseEntity.ok("Elemento eliminado con éxito.");
  }
}
