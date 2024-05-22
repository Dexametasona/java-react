package com.c1837njavareact.backend.model.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Proyecto {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  @Size(max = 75)
  @Column(nullable = false, length = 75)
  private String name;
  @Column(nullable = false)
  private String description;
  @Column(nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @ManyToMany
  @JoinTable(
          name="proyecto_stack",
          joinColumns = @JoinColumn(name = "id_proyecto"),
          inverseJoinColumns = @JoinColumn(name = "id_stack")
  )
  private Set<Stack> stacks = new HashSet<>();

  @PrePersist
  protected void onCreate() {
    this.createdAt = LocalDateTime.now();
  }
}
