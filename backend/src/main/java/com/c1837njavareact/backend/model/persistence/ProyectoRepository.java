package com.c1837njavareact.backend.model.persistence;

import com.c1837njavareact.backend.model.entities.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProyectoRepository extends JpaRepository<Proyecto, Integer> {

}
