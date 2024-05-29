package com.c1837njavareact.backend.model.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Stack {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  @Column(length = 50)
  private String name;

  @ManyToMany(mappedBy = "stacks")
  private Set<Proyecto> proyectos = new HashSet<>();

  @ManyToMany(mappedBy = "stacks")
  private Set<Proyecto> users = new HashSet<>();

  public Stack(String name){
    this.name = name;
  }
}
