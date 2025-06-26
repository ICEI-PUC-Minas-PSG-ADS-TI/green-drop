package br.com.pucminas.auth_service.adapter.doc;

import br.com.pucminas.auth_service.application.dto.LoginRequestDTO;
import br.com.pucminas.auth_service.application.dto.LoginResponseDTO;
import br.com.pucminas.auth_service.application.dto.RefreshTokenRequestDTO;
import br.com.pucminas.auth_service.application.dto.UserRequestDTO;
import br.com.pucminas.auth_service.application.dto.UserUpdateDTO;

import com.google.firebase.auth.FirebaseAuthException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Autenticação", description = "Operações de login, logout e gerenciamento de usuários Firebase")
public interface AuthControllerDoc {

    @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Login", description = "Autentica usuário com e-mail e senha, retornando token JWT e refresh token.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Autenticação realizada com sucesso"),
            @ApiResponse(responseCode = "400", description = "Requisição inválida (dados faltando ou formato incorreto)"),
            @ApiResponse(responseCode = "401", description = "Credenciais inválidas")
    })
    ResponseEntity<LoginResponseDTO> login(
            @RequestBody(
                    description = "E-mail e senha para autenticação",
                    required = true
            )
            @org.springframework.web.bind.annotation.RequestBody LoginRequestDTO loginRequest
    );

    @PostMapping(path = "/firebase/users", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Criar usuário Firebase", description = "Cria um novo usuário no Firebase Authentication com os dados fornecidos.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Usuário Firebase criado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos para criação de usuário"),
            @ApiResponse(responseCode = "500", description = "Erro interno ao comunicar com o Firebase")
    })
    ResponseEntity<String> createFirebaseUser(
            @RequestBody(
                    description = "Dados do usuário a ser criado no Firebase",
                    required = true
            )
            @org.springframework.web.bind.annotation.RequestBody UserRequestDTO userRequest,
            Long id
    ) throws FirebaseAuthException;

    @DeleteMapping(path = "/firebase/users")
    @Operation(summary = "Deletar usuário Firebase", description = "Remove o usuário identificado pelo UID do Firebase Authentication.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Usuário Firebase removido com sucesso"),
            @ApiResponse(responseCode = "400", description = "UID inválido"),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado no Firebase")
    })
    ResponseEntity<Void> deleteFirebaseUser(
            @Parameter(description = "UID do usuário Firebase", example = "uid12345abcdef", required = true)
            @RequestParam String uid
    );

    @PutMapping(path = "/firebase/users", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Atualizar usuário Firebase", description = "Atualiza dados do usuário no Firebase Authentication, como e-mail ou nome.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Usuário Firebase atualizado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Dados inválidos para atualização"),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado no Firebase")
    })
    ResponseEntity<Void> updateFirebaseUser(
            @Parameter(description = "UID do usuário Firebase", example = "uid12345abcdef", required = true)
            @RequestParam String uid,

            @RequestBody(
                    description = "Campos a serem atualizados no usuário Firebase",
                    required = true
            )
            @org.springframework.web.bind.annotation.RequestBody UserUpdateDTO userUpdateDTO
    );

    @PostMapping(path = "/logout/{uid}")
    @Operation(summary = "Logout", description = "Revoga o token de sessão do usuário identificado pelo UID.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Logout realizado com sucesso"),
            @ApiResponse(responseCode = "404", description = "UID não encontrado")
    })
    ResponseEntity<Void> logout(
            @Parameter(description = "UID do usuário a deslogar", example = "uid12345abcdef", required = true)
            @PathVariable("uid") String uid
    );

    @PostMapping(path = "/refresh-token", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "Renovar token JWT", description = "Gera um novo par de tokens (JWT e refresh token) a partir de um refresh token válido.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Token renovado com sucesso"),
            @ApiResponse(responseCode = "400", description = "Refresh token ausente ou inválido"),
            @ApiResponse(responseCode = "401", description = "Refresh token expirado ou inválido")
    })
    ResponseEntity<LoginResponseDTO> refreshToken(
            @RequestBody(
                    description = "Refresh token para gerar novo JWT",
                    required = true
            )
            @org.springframework.web.bind.annotation.RequestBody RefreshTokenRequestDTO refreshTokenRequest
    );

    @PostMapping(path = "/reset-password/{codUsu}")
    @Operation(summary = "Resetar senha", description = "Envia link ou instrui o Firebase a resetar a senha do usuário identificado pelo código.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Solicitação de reset de senha enviada com sucesso"),
            @ApiResponse(responseCode = "404", description = "Usuário com código informado não encontrado")
    })
    ResponseEntity<String> resetPassword(
            @Parameter(description = "Código do usuário para reset de senha", example = "abc123XYZ", required = true)
            @PathVariable("codUsu") String codUsu
    );
}
