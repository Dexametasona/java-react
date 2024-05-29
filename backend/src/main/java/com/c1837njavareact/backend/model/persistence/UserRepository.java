package com.c1837njavareact.backend.model.persistence;

import com.c1837njavareact.backend.model.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
}
