package com.c1837njavareact.backend.controller;

import com.c1837njavareact.backend.model.dto.JoinRequestDtoReq;
import com.c1837njavareact.backend.service.JoinService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/join-request")
public class JoinRequestController {
  private final JoinService joinService;

  @PostMapping
  public ResponseEntity<?> create(@RequestBody JoinRequestDtoReq joinRequestDto){
    return ResponseEntity.status(HttpStatus.CREATED).body(this.joinService.create(joinRequestDto));
  }

  @GetMapping("/proyecto/{id}")
  public ResponseEntity<?> getAllByProyectoId(@PathVariable int id){
    return ResponseEntity.status(HttpStatus.FOUND).body(this.joinService.getJoinRequestByProyecto(id));
  }
  @GetMapping("/from-user/{id}")
  public ResponseEntity<?> getAllFromUserId(@PathVariable int id){
    return ResponseEntity.status(HttpStatus.FOUND).body(this.joinService.getJoinRequestByUser(id));
  }
  @GetMapping("/to-user/{id}")
  public ResponseEntity<?> getAllToUserId(@PathVariable int id){
    return ResponseEntity.status(HttpStatus.FOUND).body(this.joinService.getJoinRequestByProyecto(id));
  }
}
