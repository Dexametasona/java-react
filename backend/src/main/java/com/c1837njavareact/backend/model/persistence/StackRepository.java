package com.c1837njavareact.backend.model.persistence;

import com.c1837njavareact.backend.model.entities.Stack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StackRepository extends JpaRepository<Stack, Integer> {

  Optional<Stack> findById(@NonNull int id_stack);
}
