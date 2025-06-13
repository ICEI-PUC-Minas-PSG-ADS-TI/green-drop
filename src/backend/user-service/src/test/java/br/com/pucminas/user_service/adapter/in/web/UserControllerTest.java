package br.com.pucminas.user_service.adapter.in.web;

import br.com.pucminas.user_service.adpter.in.web.UserController;
import br.com.pucminas.user_service.application.dto.UserRequestDTO;
import br.com.pucminas.user_service.application.dto.UserResponseDTO;
import br.com.pucminas.user_service.application.service.UserService;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    MockMvc mvc;

    @MockitoBean
    UserService userService;

    @Test @DisplayName("POST /v1/users → 201 Created")
    void createUser() throws Exception {
        given(userService.create(any(UserRequestDTO.class), any()))
                .willReturn(URI.create("/v1/users/42"));

        MockMultipartFile userPart = new MockMultipartFile(
                "user", "", "application/json",
                "{\"name\":\"João\",\"email\":\"j@example.com\",\"password\":\"123\",\"phone\":\"999\"}"
                        .getBytes()
        );
        MockMultipartFile photoPart = new MockMultipartFile(
                "photo","photo.jpg","image/jpeg",new byte[]{0x12,0x34}
        );

        mvc.perform(multipart("/v1/users")
                        .file(userPart)
                        .file(photoPart)
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", "/v1/users/42"));
    }

    @Test @DisplayName("GET /v1/users → 200 OK")
    void listUsers() throws Exception {
        List<UserResponseDTO> dtos = List.of(new UserResponseDTO(1L,"Nome","e@e","111","u", LocalDateTime.now(), "123"));
        given(userService.list()).willReturn(dtos);

        mvc.perform(get("/v1/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("X"));
    }

    @Test @DisplayName("GET /v1/users/{id} → 200 OK")
    void getById() throws Exception {
        given(userService.getById(1L))
                .willReturn(new UserResponseDTO(1L,"Nome","e@e","111","u", LocalDateTime.now(), "123"));
        mvc.perform(get("/v1/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("e@e"));
    }

    @Test @DisplayName("GET /v1/users/search → 200 OK")
    void search() throws Exception {
        given(userService.search("e", null))
                .willReturn(List.of(new UserResponseDTO(1L,"Nome","e@e","111","u", LocalDateTime.now(), "123")));
        mvc.perform(get("/v1/users/search")
                        .param("email","e"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].email").value("e"));
    }

    @Test @DisplayName("PUT /v1/users/{id} → 204 No Content")
    void update() throws Exception {
        doNothing().when(userService).update(eq(3L), any(), any());
        mvc.perform(put("/v1/users/3")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"A\",\"email\":\"a@a\",\"password\":\"p\",\"phone\":\"t\"}"))
                .andExpect(status().isNoContent());
    }

    @Test @DisplayName("DELETE /v1/users/{id} → 204 No Content")
    void delete() throws Exception {
        doNothing().when(userService).delete(5L);
        mvc.perform(MockMvcRequestBuilders.delete("/v1/users/5"))
                .andExpect(status().isNoContent());
    }
}
