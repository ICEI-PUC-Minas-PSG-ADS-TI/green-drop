package br.com.pucminas.user_service.infra.repository;

import br.com.pucminas.user_service.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByEmailContainingIgnoreCaseAndPhoneContainingIgnoreCase(String email, String phone);

    List<User> findByEmailContainingIgnoreCase(String email);

    List<User> findByPhoneContainingIgnoreCase(String phone);
}
