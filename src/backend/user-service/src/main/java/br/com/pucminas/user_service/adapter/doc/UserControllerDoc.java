package br.com.pucminas.user_service.adapter.doc;

import br.com.pucminas.user_service.application.dto.UserRequestDTO;
import br.com.pucminas.user_service.application.dto.UserResponseDTO;
import br.com.pucminas.user_service.application.dto.UserUpdateDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.util.List;

@Tag(name = "Usuário", description = "Operações de gerenciamento de usuários")
public interface UserControllerDoc {
    @Operation(
            summary = "Criar usuário",
            description = "Cria um novo usuário no sistema, obrigatoriamente com dados básicos e foto de perfil."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Usuário criado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados de requisição inválidos")
    })
    ResponseEntity<URI> create(
            @Parameter(description = "Dados do usuário a serem criados")
            @RequestPart("user") UserRequestDTO user,

            @Parameter(description = "Foto de perfil do usuário")
            @RequestPart("photo") MultipartFile photo
    );

    @Operation(
            summary = "Listar usuários",
            description = "Retorna todos os usuários cadastrados no sistema."
    )
    @ApiResponse(responseCode = "200", description = "Lista de usuários retornada com sucesso")
    ResponseEntity<List<UserResponseDTO>> list();

    @Operation(
            summary = "Obter usuário por ID",
            description = "Busca e retorna um usuário específico pelo seu identificador."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Usuário encontrado"),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
    })
    ResponseEntity<UserResponseDTO> getById(
            @Parameter(description = "ID do usuário", example = "1")
            @PathVariable Long id
    );

    @Operation(
            summary = "Buscar usuários",
            description = "Realiza busca de usuários filtrando por e-mail e/ou telefone. Campos opcionais."
    )
    @ApiResponse(responseCode = "200", description = "Usuários filtrados retornados com sucesso")
    ResponseEntity<List<UserResponseDTO>> search(
            @Parameter(description = "E-mail a ser buscado", example = "usuario@exemplo.com")
            @RequestParam(required = false) String email,

            @Parameter(description = "Telefone a ser buscado", example = "+5511999999999")
            @RequestParam(required = false) String phone
    );

    @Operation(
            summary = "Atualizar usuário",
            description = "Atualiza dados de um usuário existente. A foto é opcional; se não enviada, permanece a atual."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Usuário atualizado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados de requisição inválidos"),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
    })
    ResponseEntity<Void> update(
            @Parameter(description = "ID do usuário", example = "1")
            @PathVariable("id") Long id,

            @Parameter(description = "Campos para atualização do usuário")
            @RequestPart(value = "user", required = false) UserUpdateDTO payload,

            @Parameter(description = "Nova foto de perfil (opcional)")
            @RequestPart(value = "photo", required = false) MultipartFile photo
    );

    @Operation(
            summary = "Excluir usuário",
            description = "Remove um usuário do sistema com base no seu ID."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Usuário excluído com sucesso"),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
    })
    ResponseEntity<Void> delete(
            @Parameter(description = "ID do usuário", example = "1")
            @PathVariable Long id
    );
}
