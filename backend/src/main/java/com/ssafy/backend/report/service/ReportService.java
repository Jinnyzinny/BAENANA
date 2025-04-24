package com.ssafy.backend.report.service;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public interface ReportService {
	public ResponseEntity<Resource> createPdf(String filename);
}
