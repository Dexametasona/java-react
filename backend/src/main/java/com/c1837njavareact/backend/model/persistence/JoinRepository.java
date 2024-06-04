package com.c1837njavareact.backend.model.persistence;

import com.c1837njavareact.backend.model.entities.JoinRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JoinRepository extends JpaRepository<JoinRequest, Integer> {

  List<JoinRequest> findByProyectoTarget_Id(int proyectoTargetId);

  List<JoinRequest> findByUserTarget_Id(int userId);
}