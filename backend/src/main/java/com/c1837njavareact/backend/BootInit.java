package com.c1837njavareact.backend;

import com.c1837njavareact.backend.model.dto.StackDtoReq;
import com.c1837njavareact.backend.model.dto.TagDtoReq;
import com.c1837njavareact.backend.service.AuthService;
import com.c1837njavareact.backend.service.StackService;
import com.c1837njavareact.backend.service.TagService;
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
  private final TagService tagService;
  private final AuthService authService;

  @Override
  public void run(ApplicationArguments args) throws Exception {
    this.createStacks();
    this.createTags();
//    this.createUser();
  }

  private void createStacks() {
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
      for (var stack : newStacks) {
        this.stackService.create(stack);
      }
    }
  }

  private void createTags() {
    var tags = this.tagService.getAll();
    if (tags.isEmpty()) {
      List<TagDtoReq> newTags = List.of(
              new TagDtoReq("Desarrollo web"),
              new TagDtoReq("Desarrollo móvil"),
              new TagDtoReq("Desarrollo de software"),
              new TagDtoReq("DevOps"),
              new TagDtoReq("Big Data"),
              new TagDtoReq("Inteligencia artificial"),
              new TagDtoReq("Seguridad informática"),
              new TagDtoReq("Arquitectura de software"),
              new TagDtoReq("Gestión de proyectos"),
              new TagDtoReq("UI/UX Design"));
      log.info("----------------------insertado tags------------------------");
      newTags.forEach(this.tagService::create);
    }
  }

//  private void createUser() {
//    var users = this.userService.getAll();
//    if (users.isEmpty()) {
//      var newUsers = List.of(
//              new UserDtoReq(
//                      "juan_perez",
//                      "juan.perez@correo.com",
//                      "pruebaA1_",
//                      List.of(1, 2)
//              ),
//              new UserDtoReq(
//                      "maria_garcia",
//                      "maria.garcia@empresa.com",
//                      "M1superClave",
//                      List.of(3, 4, 5)
//              ),
//              new UserDtoReq(
//                      "pedro_lopez",
//                      "pedro.lopez@gmail.com",
//                      "P4ssw0rd!",
//                      List.of(1, 6)
//              ),
//              new UserDtoReq(
//                      "ana_sanchez",
//                      "ana.sanchez@universidad.edu",
//                      "An4l1t1c4",
//                      List.of(7, 8)
//              )
//      );
//      log.info("-----------------------insertando usuarios---------------");
//      newUsers.forEach(this.authService::register);
//    }
//  }
}
