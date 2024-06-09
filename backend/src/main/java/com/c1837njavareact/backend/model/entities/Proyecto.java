package com.c1837njavareact.backend.model.entities;

import com.c1837njavareact.backend.model.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
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
  @Column(nullable = false, length = 75)
  private String name;
  @Column(nullable = false, length = 1000)
  private String description;
  @Column(nullable = false, updatable = false)
  private LocalDateTime createdAt;
  @Column(nullable = false)
  private String channel;
  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private Status status;
  @Column(nullable = false, columnDefinition = "SMALLINT")
  private int rating;


  @ManyToMany
  @JoinTable(
          name="proyecto_stack",
          joinColumns = @JoinColumn(name = "id_proyecto"),
          inverseJoinColumns = @JoinColumn(name = "id")
  )
  private Set<Stack> stacks = new HashSet<>();

  @OneToMany(mappedBy = "proyecto", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<Collaborator> collaborators = new HashSet<>();

  @ManyToOne
  @JoinColumn(name = "tag_id")
  private Tag tag;

  @OneToMany(mappedBy = "proyectoTarget", orphanRemoval = true)
  private List<JoinRequest> joinRequests;

  @OneToMany(mappedBy = "proyecto", orphanRemoval = true)
  private Set<Position> positions;

  @PrePersist
  protected void onCreate() {
    this.createdAt = LocalDateTime.now();
    this.status = Status.ON_HOLD;
    this.rating = 0;
  }
}
