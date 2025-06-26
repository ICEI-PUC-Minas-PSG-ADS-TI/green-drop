package br.com.pucminas.user_service.adapter.in.web;

import br.com.pucminas.user_service.application.dto.UserRequestDTO;
import br.com.pucminas.user_service.application.dto.UserResponseDTO;
import br.com.pucminas.user_service.application.dto.UserUpdateDTO;
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
public class UserController {
    private final UserService userService;
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<URI> create(
            @RequestPart("user") UserRequestDTO payload,
            @RequestPart("photo") MultipartFile photo) {
        return ResponseEntity.created(userService.create(payload, photo)).build();
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> list() {
        return ResponseEntity.ok(userService.list());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserResponseDTO>> search(
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String phone) {
        return ResponseEntity.ok(userService.search(email, phone));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(
            @PathVariable("id") Long id,
            @RequestPart(value = "user", required = false) UserUpdateDTO payload,
            @RequestPart(value = "photo", required = false) MultipartFile photo) {
        userService.update(id, payload, photo);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}/points", params = "delta")
    public ResponseEntity<Void> adjustPoints(
            @PathVariable("id") Long id,
            @RequestParam int delta) {
        userService.updatePoints(id, delta);
        return ResponseEntity.noContent().build();
    }
}

