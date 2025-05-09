package com.ssafy.backend.inquiry.repository;

import com.ssafy.backend.inquiry.entity.Inquiry;
import com.ssafy.backend.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, Long> {

    // 특정 사용자의 문의사항 목록 조회 (페이징)
    Page<Inquiry> findByUserOrderByQuestionDateDesc(User user, Pageable pageable);

    // 모든 문의사항 목록 조회 (페이징, 관리자용)
    Page<Inquiry> findAllByOrderByQuestionDateDesc(Pageable pageable);

    // 특정 사용자가 작성한 특정 문의사항 조회
    Optional<Inquiry> findByInquiryIdAndUser(Long inquiryId, User user);
}