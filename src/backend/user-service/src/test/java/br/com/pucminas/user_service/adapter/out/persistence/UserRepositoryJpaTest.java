package br.com.pucminas.user_service.adapter.out.persistence;

import br.com.pucminas.user_service.adpter.out.persistence.UserRepositoryJpa;
import br.com.pucminas.user_service.domain.models.User;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
class UserRepositoryJpaTest {

    @Autowired
    private UserRepositoryJpa repo;

    private User build(String name, String email, String phone) {
        User u = new User();
        u.setName(name);
        u.setEmail(email);
        u.setPasswordHash("h");
        u.setPhone(phone);
        u.setRole("USER");
        u.setCreatedAt(LocalDateTime.now());
        u.setPhotoUrl("url/"+name);
        u.setFirebaseUid("uid");
        return u;
    }

    @Test @DisplayName("findByEmailContainingIgnoreCase finds correctly")
    void findByEmail() {
        repo.save(build("A","aaa","111"));
        repo.save(build("B","bbb","222"));
        List<User> r = repo.findByEmailContainingIgnoreCase("AA");
        assertThat(r).hasSize(1).extracting(User::getEmail).containsExactly("aaa");
    }

    @Test @DisplayName("findByPhoneContainingIgnoreCase finds correctly")
    void findByPhone() {
        repo.save(build("A","eee","123"));
        List<User> r = repo.findByPhoneContainingIgnoreCase("23");
        assertThat(r).hasSize(1).extracting(User::getPhone).containsExactly("123");
    }

    @Test @DisplayName("findByEmailAndPhone finds correctly")
    void findByEmailAndPhone() {
        repo.save(build("X","abc","999"));
        repo.save(build("Y","abc","123"));
        List<User> r = repo.findByEmailContainingIgnoreCaseOrPhoneContainingIgnoreCase("AB","99");
        assertThat(r).hasSize(1).extracting(User::getName).containsExactly("X");
    }
}
