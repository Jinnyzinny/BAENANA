package com.ssafy.backend.report.service;

import java.io.File;
import java.util.List;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ReportServiceImpl implements ReportService {

	private static final String UPLOAD_DIR = "uploads";

	@Override
	public ResponseEntity<Resource> fileDownload(String filename) {
		// TODO Auto-generated method stub
		File file = new File(UPLOAD_DIR, filename);

		if (!file.exists()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}

		Resource resource = new FileSystemResource(file);
		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"").body(resource);
	}
}