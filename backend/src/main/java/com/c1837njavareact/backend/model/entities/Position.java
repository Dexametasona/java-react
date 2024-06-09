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
public class Position {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int id;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private ProyectoRole proyectoRole;

  @Column(nullable = false, columnDefinition = "SMALLINT")
  private int quantity;
  @Column(nullable = false, length = 1000)
  private String description;
  @ManyToOne
  @JoinColumn(name = "proyecto_id")
  private Proyecto proyecto;
}
