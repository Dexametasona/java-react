package com.c1837njavareact.backend.service;

import com.c1837njavareact.backend.model.entities.UserEntity;
import org.springframework.security.core.userdetails.UserDetails;

public interface JwtService {

  String getToken(UserDetails userDetail);

  String getUsernameFromToken(String token);

  boolean isTokenValid(String token, UserDetails userDetails);
}
