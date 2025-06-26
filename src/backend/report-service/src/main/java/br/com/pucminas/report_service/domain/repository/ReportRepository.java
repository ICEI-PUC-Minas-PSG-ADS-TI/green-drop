package br.com.pucminas.report_service.domain.repository;

import br.com.pucminas.report_service.adapter.out.persistence.ReportRepositoryJpa;
import br.com.pucminas.report_service.domain.model.Report;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface ReportRepository extends ReportRepositoryJpa {
    List<Report> findAllByUserId(Long userId);
}
