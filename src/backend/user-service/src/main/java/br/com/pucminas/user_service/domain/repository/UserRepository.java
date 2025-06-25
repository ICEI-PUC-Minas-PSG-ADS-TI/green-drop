package br.com.pucminas.user_service.domain.repository;

import br.com.pucminas.user_service.adapter.out.persistence.UserRepositoryJpa;
import br.com.pucminas.user_service.domain.model.User;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface UserRepository extends UserRepositoryJpa {
    List<User> findByEmailContainingIgnoreCaseOrPhoneContainingIgnoreCase(String email, String phone);

    List<User> findByEmailContainingIgnoreCase(String email);

    List<User> findByPhoneContainingIgnoreCase(String phone);
}
