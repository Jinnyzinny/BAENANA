package com.ssafy.backend.faq.repository;

import com.ssafy.backend.faq.entity.Faq;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FaqRepository extends JpaRepository<Faq, Long> {

    // 최신순으로 FAQ 목록 조회
    List<Faq> findAllByOrderByCreatedAtDesc();
}