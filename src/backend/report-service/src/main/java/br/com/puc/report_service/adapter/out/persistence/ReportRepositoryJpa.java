package br.com.puc.report_service.adapter.out.persistence;

import br.com.puc.report_service.domain.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepositoryJpa extends JpaRepository<Report, Long> {
}
