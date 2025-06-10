package br.com.pucminas.user_service.domain.repository;

import br.com.pucminas.user_service.adpter.out.persistence.UserRepositoryJpa;
import br.com.pucminas.user_service.domain.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends UserRepositoryJpa {
    List<User> findByEmailContainingIgnoreCaseAndPhoneContainingIgnoreCase(String email, String phone);

    List<User> findByEmailContainingIgnoreCase(String email);

    List<User> findByPhoneContainingIgnoreCase(String phone);
}
