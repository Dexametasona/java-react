package com.c1837njavareact.backend.controller;

import com.c1837njavareact.backend.model.dto.JoinRequestDtoReq;
import com.c1837njavareact.backend.service.JoinService;
import jakarta.validation.Valid;
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
  public ResponseEntity<?> create(@Valid @RequestBody JoinRequestDtoReq joinRequestDto){
    return ResponseEntity.status(HttpStatus.CREATED).body(this.joinService.create(joinRequestDto));
  }

  @GetMapping("/proyecto/{id}")
  public ResponseEntity<?> getAllByProyectoId(@PathVariable int id){
    return ResponseEntity.status(HttpStatus.OK).body(this.joinService.getJoinRequestByProyecto(id));
  }
  @GetMapping("/to-user/{id}")
  public ResponseEntity<?> getAllFromUserId(@PathVariable int id){
    return ResponseEntity.status(HttpStatus.OK).body(this.joinService.getJoinRequestByUser(id));
  }

  @GetMapping("/from-current-user")
  public ResponseEntity<?> getAllFromCurrentUser(){
    return ResponseEntity.status(HttpStatus.OK)
            .body(this.joinService.getJoinRequestOfCurrentUser());
  }

  @GetMapping("/to-proyecto/{id}")
  public ResponseEntity<?> getAllToUserId(@PathVariable int id){
    return ResponseEntity.status(HttpStatus.OK).body(this.joinService.getJoinRequestByProyecto(id));
  }
  @GetMapping("/accept/{id}")
  public ResponseEntity<String> acceptRequest(@PathVariable int id){
    this.joinService.acceptRequest(id);
    return ResponseEntity.ok("Solicitud aceptada");
  }
  @GetMapping("/reject/{id}")
  public ResponseEntity<String> rejectRequest(@PathVariable int id){
    this.joinService.rejectRequest(id);
    return ResponseEntity.ok("Solicitud denegada.");
  }
}
