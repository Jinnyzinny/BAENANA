package com.ssafy.backend.inquiry.service;

import  com.ssafy.backend.inquiry.entity.Inquiry;
import com.ssafy.backend.inquiry.dto.requestDto.InquiryRequestDto;
import com.ssafy.backend.inquiry.dto.responseDto.InquiryResponseDto;
import com.ssafy.backend.inquiry.exception.AnswerNotFoundException;
import com.ssafy.backend.inquiry.exception.ForbiddenInquiryAccessException;
import com.ssafy.backend.inquiry.exception.InquiryAlreadyAnsweredException;
import com.ssafy.backend.inquiry.exception.InquiryNotFoundException;
import com.ssafy.backend.inquiry.repository.InquiryRepository;

import com.ssafy.backend.user.entity.User;
import com.ssafy.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class InquiryService {

    private final InquiryRepository inquiryRepository;
    private final UserRepository userRepository;

    // 문의사항 생성
    @Transactional
    public InquiryResponseDto.Create createInquiry(InquiryRequestDto.Create request, User user) {
        Inquiry inquiry = Inquiry.builder()
                .user(user)
                .title(request.getTitle())
                .questionContent(request.getQuestionContent())
                .questionDate(LocalDateTime.now())
                .status(Inquiry.InquiryStatus.PENDING)
                .build();

        Inquiry savedInquiry = inquiryRepository.save(inquiry);

        return InquiryResponseDto.Create.builder()
                .inquiryId(savedInquiry.getInquiryId())
                .build();
    }

    // 사용자 본인의 문의사항 목록 조회 (페이징)
    @Transactional(readOnly = true)
    public InquiryResponseDto.PagedList<InquiryResponseDto.ListItem> getMyInquiries(User user, Pageable pageable) {
        Page<Inquiry> inquiries = inquiryRepository.findByUserOrderByQuestionDateDesc(user, pageable);
        return InquiryResponseDto.PagedList.fromPage(inquiries, InquiryResponseDto.ListItem::fromEntity);
    }

    // 사용자 본인의 문의사항 상세 조회
    @Transactional(readOnly = true)
    public InquiryResponseDto.Detail getMyInquiryDetail(Long inquiryId, User user) {
        Inquiry inquiry = inquiryRepository.findByInquiryIdAndUser(inquiryId, user)
                .orElseThrow(() -> new InquiryNotFoundException("조회 권한이 없습니다."));

        return InquiryResponseDto.Detail.fromEntity(inquiry);
    }

    // 문의사항 수정
    @Transactional
    public InquiryResponseDto.Update updateInquiry(Long inquiryId, InquiryRequestDto.Update request, User user) {
        Inquiry inquiry = inquiryRepository.findByInquiryIdAndUser(inquiryId, user)
                .orElseThrow(() -> new InquiryNotFoundException("문의사항을 찾을 수 없습니다."));

        // 이미 답변이 등록된 문의는 수정 불가
        if (inquiry.isAnswered()) {
            throw new InquiryAlreadyAnsweredException("답변 완료된 문의는 수정할 수 없습니다.");
        }

        inquiry.update(request.getTitle(), request.getQuestionContent());

        return InquiryResponseDto.Update.fromEntity(inquiry);
    }

    // 문의사항 삭제
    @Transactional
    public void deleteInquiry(Long inquiryId, User user) {
        Inquiry inquiry = inquiryRepository.findByInquiryIdAndUser(inquiryId, user)
                .orElseThrow(() -> new InquiryNotFoundException("문의사항을 찾을 수 없습니다."));

        // 이미 답변이 등록된 문의는 삭제 불가
        if (inquiry.isAnswered()) {
            throw new InquiryAlreadyAnsweredException("답변 완료된 문의는 삭제할 수 없습니다.");
        }

        inquiryRepository.delete(inquiry);
    }

    // (관리자) 전체 문의사항 목록 조회 (페이징)
    @Transactional(readOnly = true)
    public InquiryResponseDto.PagedList<InquiryResponseDto.AdminListItem> getAllInquiries(Pageable pageable) {
        Page<Inquiry> inquiries = inquiryRepository.findAllByOrderByQuestionDateDesc(pageable);
        return InquiryResponseDto.PagedList.fromPage(inquiries, InquiryResponseDto.AdminListItem::fromEntity);
    }

    // (관리자) 문의사항 상세 조회
    @Transactional(readOnly = true)
    public InquiryResponseDto.Detail getInquiryDetail(Long inquiryId) {
        Inquiry inquiry = inquiryRepository.findById(inquiryId)
                .orElseThrow(() -> new InquiryNotFoundException("문의사항을 찾을 수 없습니다."));

        return InquiryResponseDto.Detail.fromEntity(inquiry);
    }

    // (관리자) 문의 답변 등록
    @Transactional
    public InquiryResponseDto.Create createAnswer(Long inquiryId, InquiryRequestDto.AnswerCreate request, User admin) {
        Inquiry inquiry = inquiryRepository.findById(inquiryId)
                .orElseThrow(() -> new InquiryNotFoundException("문의사항을 찾을 수 없습니다."));

        // 이미 답변이 등록된 경우
        if (inquiry.isAnswered()) {
            throw new InquiryAlreadyAnsweredException("이미 답변이 등록된 문의사항입니다.");
        }

        inquiry.addAnswer(request.getAnswerContent(), admin);

        return InquiryResponseDto.Create.builder()
                .inquiryId(inquiry.getInquiryId())
                .build();
    }

    // (관리자) 문의 답변 수정
    @Transactional
    public InquiryResponseDto.Answer updateAnswer(Long inquiryId, InquiryRequestDto.AnswerUpdate request) {
        Inquiry inquiry = inquiryRepository.findById(inquiryId)
                .orElseThrow(() -> new InquiryNotFoundException("문의사항을 찾을 수 없습니다."));

        // 답변이 없는 경우
        if (!inquiry.isAnswered()) {
            throw new AnswerNotFoundException("수정할 답변이 존재하지 않습니다.");
        }

        inquiry.updateAnswer(request.getAnswerContent());

        return InquiryResponseDto.Answer.fromEntity(inquiry);
    }

    // (관리자) 문의 답변 삭제
    @Transactional
    public InquiryResponseDto.Answer deleteAnswer(Long inquiryId) {
        Inquiry inquiry = inquiryRepository.findById(inquiryId)
                .orElseThrow(() -> new InquiryNotFoundException("문의사항을 찾을 수 없습니다."));

        // 답변이 없는 경우
        if (!inquiry.isAnswered()) {
            throw new AnswerNotFoundException("삭제할 답변이 존재하지 않습니다.");
        }

        inquiry.removeAnswer();

        return InquiryResponseDto.Answer.fromEntity(inquiry);
    }
}