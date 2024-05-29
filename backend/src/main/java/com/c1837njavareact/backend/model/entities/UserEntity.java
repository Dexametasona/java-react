package com.c1837njavareact.backend.model.entities;

import com.c1837njavareact.backend.model.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class UserEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  @Column(length = 25, nullable = false)
  private String username;
  @Column(length = 75, nullable = false)
  private String email;
  @Column(length = 16, nullable = false)
  private String password;
  @Column(nullable = false)
  private LocalDateTime createdAt;
  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private Status status;

  @ManyToMany
  @JoinTable(
          name="stack_user",
          joinColumns = @JoinColumn(name = "id_user"),
          inverseJoinColumns = @JoinColumn(name = "id_stack")
  )
  private Set<Stack> stacks = new HashSet<>();

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<Collaborator> collaborators = new HashSet<>();

  public UserEntity(String username, String email, String password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  @PrePersist
  protected void onCreate() {
    this.createdAt = LocalDateTime.now();
    this.status = Status.ON_HOLD;
  }
}
