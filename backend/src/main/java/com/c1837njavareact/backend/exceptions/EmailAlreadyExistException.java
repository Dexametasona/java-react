package com.c1837njavareact.backend.exceptions;

public class EmailAlreadyExistException extends RuntimeException{
  public EmailAlreadyExistException(String message){
    super(message);
  }
}
