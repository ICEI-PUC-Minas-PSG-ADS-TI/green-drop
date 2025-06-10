package br.com.pucminas.user_service.adpter.doc;

import br.com.pucminas.user_service.application.dto.UserRequestDTO;
import br.com.pucminas.user_service.application.dto.UserResponseDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.util.List;

@Tag(name = "User", description = "User management")
@RequestMapping("/v1/users")
public interface UserControllerDoc {
    @Operation(summary = "Create user")
    ResponseEntity<URI> create(
            @RequestPart("user")  UserRequestDTO  user,
            @RequestPart("photo") MultipartFile  photo
    );

    @Operation(summary = "List users")
    ResponseEntity<List<UserResponseDTO>> list();

    @Operation(summary = "Get user by ID")
    ResponseEntity<UserResponseDTO> getById(@PathVariable Long id);

    @Operation(summary = "Search users")
    ResponseEntity<List<UserResponseDTO>> search(
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String phone
    );

    @Operation(summary = "Update user")
    ResponseEntity<Void> update(
            @PathVariable Long id,
            @RequestBody UserRequestDTO payload
    );

    @Operation(summary = "Delete user")
    ResponseEntity<Void> delete(@PathVariable Long id);
}
