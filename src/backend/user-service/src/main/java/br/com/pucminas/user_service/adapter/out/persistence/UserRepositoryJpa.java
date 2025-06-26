package br.com.pucminas.user_service.adapter.out.persistence;

import br.com.pucminas.user_service.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepositoryJpa extends JpaRepository<User, Long> {
    List<User> findByEmailContainingIgnoreCaseOrPhoneContainingIgnoreCase(String email, String phone);

    List<User> findByEmailContainingIgnoreCase(String email);

    List<User> findByPhoneContainingIgnoreCase(String phone);
}

