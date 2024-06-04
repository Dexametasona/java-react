package com.c1837njavareact.backend.model.persistence;

import com.c1837njavareact.backend.model.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

  Optional<UserEntity> findByEmail(String email);

  boolean existsByEmail(String email);
}
