package br.com.puc.report_service.domain.exception;

import org.springframework.http.HttpStatus;

public class ReportNotFound extends ApiException{
  public ReportNotFound(String message) {
    super(message, HttpStatus.NOT_FOUND);
  }

  public ReportNotFound(String message, HttpStatus status) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
