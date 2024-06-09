package com.c1837njavareact.backend;

import com.c1837njavareact.backend.model.dto.StackDtoReq;
import com.c1837njavareact.backend.model.dto.TagDtoReq;
import com.c1837njavareact.backend.service.AuthService;
import com.c1837njavareact.backend.service.StackService;
import com.c1837njavareact.backend.service.TagService;
import com.c1837njavareact.backend.service.UserService;
import com.c1837njavareact.backend.model.dto.UserDtoReq;
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
    this.createUser();
  }

  private void createStacks() {
    var stacks = this.stackService.getAll();
    if (stacks.isEmpty()) {
      var newStacks = List.of(
              new StackDtoReq("Python", "#3776AB"),
              new StackDtoReq("Java", "#B07219"),
              new StackDtoReq("JavaScript", "#F7DF1E"),
              new StackDtoReq("C#", "#178600"),
              new StackDtoReq("C++", "#00599C"),
              new StackDtoReq("Ruby", "#701516"),
              new StackDtoReq("Go", "#00ADD8"),
              new StackDtoReq("Swift", "#FA7343"),
              new StackDtoReq("Kotlin", "#0095D5"),
              new StackDtoReq("Rust", "#DEA584"),
              new StackDtoReq("Spring Boot", "#6DB33F"),
              new StackDtoReq("Django", "#092E20"),
              new StackDtoReq("Flask", "#000000"),
              new StackDtoReq("React", "#61DAFB"),
              new StackDtoReq("Angular", "#DD0031"),
              new StackDtoReq("Vue.js", "#4FC08D"),
              new StackDtoReq("ASP.NET", "#512BD4"),
              new StackDtoReq("Ruby on Rails", "#CC0000"),
              new StackDtoReq("Node.js", "#339933"),
              new StackDtoReq("Laravel", "#FF2D20")
      );
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

  private void createUser() {
    var users = this.userService.getAll();
    if (users.isEmpty()) {
      var newUsers = List.of(
              new UserDtoReq(
                      "juan_perez",
                      "juan.perez@correo.com",
                      "pruebaA1_",
                      List.of(1, 2)
              ),
              new UserDtoReq(
                      "maria_garcia",
                      "maria.garcia@empresa.com",
                      "pruebaA1_",
                      List.of(3, 4, 5)
              ),
              new UserDtoReq(
                      "pedro_lopez",
                      "pedro.lopez@gmail.com",
                      "pruebaA1_",
                      List.of(1, 6)
              ),
              new UserDtoReq(
                      "ana_sanchez",
                      "ana.sanchez@universidad.edu",
                      "pruebaA1_",
                      List.of(7, 8)
              )
      );
      log.info("-----------------------insertando usuarios---------------");
      newUsers.forEach(this.authService::register);
    }
  }
}
