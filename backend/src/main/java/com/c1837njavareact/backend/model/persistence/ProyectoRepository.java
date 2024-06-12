package com.c1837njavareact.backend.model.persistence;

import com.c1837njavareact.backend.model.entities.Proyecto;
import com.c1837njavareact.backend.model.enums.ProyectoRole;
import com.c1837njavareact.backend.model.enums.Status;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;


@Repository
public interface ProyectoRepository extends JpaRepository<Proyecto, Integer> {

  @Modifying
  @Transactional
  @Query("UPDATE Proyecto p SET p.status = :status WHERE p.id = :id")
  void updateStatusById(@Param("id") int id, @Param("status") Status status);

  @Modifying
  @Transactional
  @Query("UPDATE Proyecto p SET p.rating = p.rating + 1 WHERE p.id = :id")
  void updateRating(@Param("id") int id);

  Set<Proyecto> findByCollaborators_User_EmailAndCollaborators_ProyectoRole(String email, ProyectoRole proyectoRole);
  Set<Proyecto> findByCollaborators_User_EmailAndCollaborators_ProyectoRoleNot(String email, ProyectoRole proyectoRole);
  Set<Proyecto> findByPositions_ProyectoRole(ProyectoRole proyectoRole);

}
