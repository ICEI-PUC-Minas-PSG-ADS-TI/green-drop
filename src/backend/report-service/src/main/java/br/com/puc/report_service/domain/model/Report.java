package br.com.puc.report_service.domain.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data @Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "report")
public class Report {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String description;

    @Column(name = "photo_url")
    private String photoUrl;

    private String status;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "validated_at")
    private LocalDateTime validatedAt;

    private BigDecimal latitude;

    private BigDecimal longitude;

    private String category;

    @Column(name = "problem_type")
    private String problemType;
}
