package com.c1837njavareact.backend.model.entities;

import com.c1837njavareact.backend.model.enums.ProyectoRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class JoinRequest {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int id;
  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private ProyectoRole proyectoRole;
  private String message;
  @Column(updatable = false, nullable = false)
  private LocalDateTime createdAt;

  @ManyToOne
  @JoinColumn(name = "userTarget_id")
  private UserEntity userTarget;

  @ManyToOne
  @JoinColumn(name = "userOrigin_id")
  private UserEntity userOrigin;

  @ManyToOne
  @JoinColumn(name = "proyectoTarget_id")
  private Proyecto proyectoTarget;

  @PrePersist
  public void onCreate(){
    this.createdAt = LocalDateTime.now();
  }
}
