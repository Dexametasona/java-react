package com.c1837njavareact.backend.model.persistence;

import com.c1837njavareact.backend.model.entities.Position;
import com.c1837njavareact.backend.model.enums.ProyectoRole;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PositionRepository extends JpaRepository<Position, Integer> {
  @Modifying
  @Transactional
  @Query("UPDATE Position p SET p.quantity = p.quantity - 1 WHERE p.id = :id AND p.quantity > 0")
  void updateQuantity(@Param("id") int id);

  Optional<Position> findByProyectoRoleAndProyecto_Id(ProyectoRole proyectoRole, int id);

  void deleteByQuantityLessThan(int quantity);
}
