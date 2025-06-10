package br.com.pucminas.user_service.adpter.in.web;

import br.com.pucminas.user_service.adpter.doc.UserControllerDoc;
import br.com.pucminas.user_service.application.dto.UserRequestDTO;
import br.com.pucminas.user_service.application.dto.UserResponseDTO;
import br.com.pucminas.user_service.application.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/users")
public class UserController implements UserControllerDoc {
    private final UserService userService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<URI> create(UserRequestDTO payload, MultipartFile photo) {
        return ResponseEntity.created(userService.create(payload, photo)).build();
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> list() {
        return ResponseEntity.ok(userService.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getById(Long id) {
        return ResponseEntity.ok(userService.getById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserResponseDTO>> search(String email, String phone) {
        return ResponseEntity.ok(userService.search(email, phone));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(Long id, UserRequestDTO payload) {
        userService.update(id, payload);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

