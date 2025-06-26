package br.com.pucminas.user_service.domain.model;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data @Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    @Column(name = "password_hash")
    private String passwordHash;
    private String phone;
    private String role;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "photo_url")
    private String photoUrl;
    @Column(name = "firebase_uid")
    private String firebaseUid;
    private Integer points;
}
