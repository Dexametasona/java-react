package com.c1837njavareact.backend.controller;

import com.c1837njavareact.backend.model.dto.TagDtoReq;
import com.c1837njavareact.backend.service.TagService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/tag")
@RequiredArgsConstructor
public class TagController {
  private final TagService tagService;

  @PostMapping
  public ResponseEntity<?> create (@RequestBody @Valid TagDtoReq tag){
   return ResponseEntity.status(HttpStatus.CREATED)
           .body(this.tagService.create(tag));
  }
  @GetMapping
  public ResponseEntity<?> getAll(){
    return ResponseEntity.ok(this.tagService.getAll());
  }
  @GetMapping("/{id}")
  public ResponseEntity<?> getById(@PathVariable int id){
    return ResponseEntity.ok(this.tagService.getById(id));
  }
  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteById(@PathVariable int id){
    this.tagService.deleteById(id);
    return ResponseEntity.ok("Elemento con id: "+id+" eliminado con éxito.");
  }
  @PutMapping("/{id}")
  public ResponseEntity<?> update(@RequestBody @Valid TagDtoReq tagDto,
                                  @PathVariable int id){
    return ResponseEntity.ok(this.tagService.updateById(tagDto, id));
  }
}
