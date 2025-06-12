package br.com.pucminas.user_service.application.service;

import br.com.pucminas.user_service.application.client.AuthClient;
import br.com.pucminas.user_service.application.client.ImageClient;
import br.com.pucminas.user_service.application.dto.UserRequestDTO;
import br.com.pucminas.user_service.application.dto.UserUpdateDTO;
import br.com.pucminas.user_service.domain.exception.*;
import br.com.pucminas.user_service.domain.models.User;
import br.com.pucminas.user_service.domain.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.RestClientException;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

class UserServiceTest {

    @InjectMocks
    private UserService service;
    @Mock private UserRepository repo;
    @Mock private ImageClient imageClient;
    @Mock private AuthClient authClient;
    @Mock private PasswordEncoder encoder;

    private UserRequestDTO dto;
    private UserUpdateDTO updateDto;
    private MockMultipartFile photo;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        dto = new UserRequestDTO("N","e@e","pass","123");
        photo = new MockMultipartFile("photo","p.jpg","image/jpeg",new byte[]{1});
    }

    @Test
    void create_success() throws Exception {
        given(authClient.createFirebaseUser(dto)).willReturn("UID123");
        given(imageClient.upload(photo)).willReturn("http://img/123");
        given(encoder.encode("pass")).willReturn("HASH");
        User saved = new User(1L,"N","e@e","HASH","123","USER",LocalDateTime.now(),"123","UID123");
        given(repo.save(any())).willReturn(saved);

        URI uri = service.create(dto, photo);
        assertThat(uri.toString()).isEqualTo("/v1/users/1");

        then(authClient).should().createFirebaseUser(dto);
        then(imageClient).should().upload(photo);
        then(repo).should().save(any());
    }

    @Test
    void extractImageId_invalidUrl_throws() {
        assertThatThrownBy(() ->
                ReflectionTestUtils.invokeMethod(service, "extractImageId", "")
        )
                .isInstanceOf(ApiException.class)
                .hasMessageContaining("URL DA FOTO INVÁLIDA");
    }

    @Test
    void uploadPhoto_failure_throwsPhotoUploadException() throws IOException {
        given(imageClient.upload(photo)).willThrow(new IOException("oops"));
        assertThatThrownBy(() -> {
            service.uploadPhoto(photo);
        }).isInstanceOf(PhotoUploadException.class);
    }

    @Test
    void getById_notFound_throwsUserNotFound() {
        given(repo.findById(9L)).willReturn(Optional.empty());
        assertThatThrownBy(() -> service.getById(9L))
                .isInstanceOf(UserNotFoundException.class)
                .hasMessageContaining("USUÁRIO NÃO ENCONTRADO");
    }

    @Test
    void search_variousParams() {
        User u = new User();
        u.setName("X"); u.setEmail("e"); u.setPhone("p"); u.setPhotoUrl("u");
        given(repo.findAll()).willReturn(List.of(u));
        var all = service.search(null,null);
        assertThat(all).hasSize(1);

        given(repo.findByEmailContainingIgnoreCase("e")).willReturn(List.of(u));
        var byEmail = service.search("e", null);
        assertThat(byEmail).hasSize(1);

        given(repo.findByPhoneContainingIgnoreCase("p")).willReturn(List.of(u));
        var byPhone = service.search(null, "p");
        assertThat(byPhone).hasSize(1);

        given(repo.findByEmailContainingIgnoreCaseOrPhoneContainingIgnoreCase("e","p"))
                .willReturn(List.of(u));
        var both = service.search("e","p");
        assertThat(both).hasSize(1);
    }

    @Test
    void update_conflict_throwsApiException() {
        User existing = new User();
        existing.setFirebaseUid("uid");
        given(repo.findById(2L)).willReturn(Optional.of(existing));
        doThrow(new DataIntegrityViolationException("dup")).when(repo).save(existing);
        assertThatThrownBy(() -> service.update(2L, updateDto, photo))
                .isInstanceOf(ApiException.class)
                .hasMessageContaining("Falha ao atualizar usuário");
    }

    @Test
    void delete_notFound_throwsUserNotFound() {
        given(repo.findById(3L)).willReturn(Optional.empty());
        assertThatThrownBy(() -> service.delete(3L))
                .isInstanceOf(UserNotFoundException.class);
    }

    @Test
    void delete_imageFail_throwsImageDeletionException() {
        User u = new User(); u.setId(4L);
        u.setPhotoUrl("http://img/xyz");
        u.setFirebaseUid("uid");
        given(repo.findById(4L)).willReturn(Optional.of(u));
        willThrow(new RestClientException("fail")).given(imageClient).delete("xyz");

        assertThatThrownBy(() -> service.delete(4L))
                .isInstanceOf(ImageDeletionException.class);
    }
}
