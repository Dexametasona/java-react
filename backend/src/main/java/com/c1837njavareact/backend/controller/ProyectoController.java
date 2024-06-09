package com.c1837njavareact.backend.controller;

import com.c1837njavareact.backend.model.dto.ProyectoDtoReq;
import com.c1837njavareact.backend.model.dto.ProyectoDtoRes;
import com.c1837njavareact.backend.model.dto.StatusDto;
import com.c1837njavareact.backend.service.ProyectoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
  public ResponseEntity<?> getAll(@RequestParam(defaultValue = "0") int page,
                                  @RequestParam(defaultValue = "9") int size,
                                  @RequestParam(defaultValue = "id") String sort,
                                  @RequestParam(defaultValue = "asc") String direction){
    Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(direction), sort));
    return ResponseEntity.ok(proyectoService.getAll(pageable));
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getById(@PathVariable int id){
    return ResponseEntity.ok(this.proyectoService.getById(id));
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> updateById(@PathVariable int id, @RequestBody ProyectoDtoReq proyecto){
    return ResponseEntity.ok(this.proyectoService.update(proyecto, id));
  }

  @PatchMapping("/{id}")
  public ResponseEntity<?> updateStatusById(@PathVariable int id, @RequestBody StatusDto status){
    return ResponseEntity.status(HttpStatus.ACCEPTED).body(this.proyectoService.updateStatusById(id, status));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteById(@PathVariable int id){
    this.proyectoService.deleteById(id);
    return ResponseEntity.ok("Elemento eliminado con éxito.");
  }
}
