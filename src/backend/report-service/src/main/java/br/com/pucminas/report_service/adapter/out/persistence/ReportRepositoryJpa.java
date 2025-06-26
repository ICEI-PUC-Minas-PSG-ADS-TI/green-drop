package br.com.pucminas.report_service.adapter.out.persistence;

import br.com.pucminas.report_service.domain.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepositoryJpa extends JpaRepository<Report, Long> {
    List<Report> findAllByUserId(Long userId);
}
