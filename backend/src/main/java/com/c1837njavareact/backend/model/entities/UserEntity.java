package com.c1837njavareact.backend.model.entities;

import com.c1837njavareact.backend.model.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"email"})})
public class UserEntity implements UserDetails {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  @Column(length = 25, nullable = false)
  private String userName;
  @Column(length = 75, nullable = false)
  private String email;
  @Column(nullable = false)
  private String password;
  @Column(nullable = false)
  private LocalDateTime createdAt;

  @Enumerated(EnumType.STRING)
  private Role role;

  @ManyToMany
  @JoinTable(
          name="stack_user",
          joinColumns = @JoinColumn(name = "id_user"),
          inverseJoinColumns = @JoinColumn(name = "id_stack")
  )
  private Set<Stack> stacks = new HashSet<>();

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<Collaborator> collaborators = new HashSet<>();

  @PrePersist
  protected void onCreate() {
    this.createdAt = LocalDateTime.now();
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority(role.name()));
  }

  @Override
  public String getUsername() {
    return this.email;
  }

  public String getUserName() {
    return this.userName;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
