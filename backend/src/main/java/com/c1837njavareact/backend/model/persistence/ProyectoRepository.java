package com.c1837njavareact.backend.model.persistence;

import com.c1837njavareact.backend.model.entities.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProyectoRepository extends JpaRepository<Proyecto, Integer> {
}
