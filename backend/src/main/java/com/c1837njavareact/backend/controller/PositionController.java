package com.c1837njavareact.backend.controller;

import com.c1837njavareact.backend.model.dto.PositionDtoReq;
import com.c1837njavareact.backend.service.PositionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.base-path}/position")
@RequiredArgsConstructor
public class PositionController {
  private final PositionService positionService;

  @PostMapping
  public ResponseEntity<?> create(@RequestBody PositionDtoReq positionDtoReq){
    return ResponseEntity.status(HttpStatus.CREATED)
            .body(this.positionService.create(positionDtoReq));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteById(@PathVariable int id){
    this.positionService.deleteById(id);
    return ResponseEntity.ok("Posición borrada, id:"+id);
  }

  @GetMapping("/role")
  public ResponseEntity<?> getRoles(){
    return ResponseEntity.ok(this.positionService.getRoles());
  }
}
