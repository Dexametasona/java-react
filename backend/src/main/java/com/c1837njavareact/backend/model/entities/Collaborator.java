package com.c1837njavareact.backend.model.entities;

import com.c1837njavareact.backend.model.enums.ProyectoRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Collaborator {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @ManyToOne
  @JoinColumn(name = "proyecto_id")
  private Proyecto proyecto;

  @ManyToOne
  @JoinColumn(name = "userId")
  private UserEntity user;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private ProyectoRole proyectoRole;
}
