package com.c1837njavareact.backend.model.persistence;

import com.c1837njavareact.backend.model.entities.Collaborator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollaboratorRepository extends JpaRepository<Collaborator, Integer> {
}
