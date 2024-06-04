package com.c1837njavareact.backend;

import com.c1837njavareact.backend.model.dto.StackDtoReq;
import com.c1837njavareact.backend.service.StackService;
import com.c1837njavareact.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class BootInit implements ApplicationRunner {
  private final StackService stackService;
  private final UserService userService;

  @Override
  public void run(ApplicationArguments args) throws Exception {
    this.createStacks();
  }

  private void createStacks(){
    var stacks = this.stackService.getAll();
    if (stacks.isEmpty()) {
      var newStacks = List.of(
              new StackDtoReq("Python"),
              new StackDtoReq("Java"),
              new StackDtoReq("JavaScript"),
              new StackDtoReq("C#"),
              new StackDtoReq("C++"),
              new StackDtoReq("Ruby"),
              new StackDtoReq("Go"),
              new StackDtoReq("Swift"),
              new StackDtoReq("Kotlin"),
              new StackDtoReq("Rust"),
              new StackDtoReq("Spring Boot"),
              new StackDtoReq("Django"),
              new StackDtoReq("Flask"),
              new StackDtoReq("React"),
              new StackDtoReq("Angular"),
              new StackDtoReq("Vue.js"),
              new StackDtoReq("ASP.NET"),
              new StackDtoReq("Ruby on Rails"),
              new StackDtoReq("Node.js"),
              new StackDtoReq("Laravel"));
      log.info("----------------------------creando stacks---------------------------");
      for(var stack : newStacks){
        this.stackService.create(stack);
      }
    }
  }
}
