package com.ssafy.backend.faq.controller;

import com.ssafy.backend.common.exception.ForbiddenException;
import com.ssafy.backend.faq.dto.requestDto.FaqRequestDto;
import com.ssafy.backend.faq.dto.responseDto.FaqResponseDto;
import com.ssafy.backend.faq.service.FaqService;
import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.user.entity.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faq")
@RequiredArgsConstructor
public class FaqController {

    private final FaqService faqService;

    // (공통) FAQ 목록 조회
    @GetMapping
    public ApiResponse<List<FaqResponseDto.List>> getAllFaqs() {
        List<FaqResponseDto.List> faqs = faqService.getAllFaqs();
        return ApiResponse.success("FAQ 목록이 조회되었습니다.", faqs);
    }

    // (공통) FAQ 상세 조회
    @GetMapping("/{faqId}")
    public ApiResponse<FaqResponseDto.Detail> getFaqById(@PathVariable Long faqId) {
        FaqResponseDto.Detail faq = faqService.getFaqById(faqId);
        return ApiResponse.success("FAQ 상세 정보가 조회되었습니다.", faq);
    }

    // (관리자) FAQ 작성
    @PostMapping("/admin")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ApiResponse<FaqResponseDto.Create> createFaq(
            @RequestBody @Valid FaqRequestDto.Create request,
            @AuthenticationPrincipal User user) {

        if (user == null) {
            throw new ForbiddenException("인증된 사용자만 접근할 수 있습니다.");
        }

        if (!"ADMIN".equals(user.getRole())) {
            throw new ForbiddenException("관리자만 접근할 수 있습니다.");
        }

        FaqResponseDto.Create response = faqService.createFaq(request, user.getUserId());
        return ApiResponse.success("FAQ가 등록되었습니다.", HttpStatus.CREATED, response);
    }

    // (관리자) FAQ 수정
    @PatchMapping("/admin/{faqId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ApiResponse<FaqResponseDto.Create> updateFaq(
            @PathVariable Long faqId,
            @RequestBody FaqRequestDto.Update request,
            @AuthenticationPrincipal User user) {

        if (user == null) {
            throw new ForbiddenException("인증된 사용자만 접근할 수 있습니다.");
        }

        if (!"ADMIN".equals(user.getRole())) {
            throw new ForbiddenException("관리자만 접근할 수 있습니다.");
        }

        FaqResponseDto.Create response = faqService.updateFaq(faqId, request);
        return ApiResponse.success("FAQ가 수정되었습니다.", response);
    }

    // (관리자) FAQ 삭제
    @DeleteMapping("/admin/{faqId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ApiResponse<?> deleteFaq(
            @PathVariable Long faqId,
            @AuthenticationPrincipal User user) {

        if (user == null) {
            throw new ForbiddenException("인증된 사용자만 접근할 수 있습니다.");
        }

        if (!"ADMIN".equals(user.getRole())) {
            throw new ForbiddenException("관리자만 접근할 수 있습니다.");
        }

        faqService.deleteFaq(faqId);
        return ApiResponse.success("FAQ가 삭제되었습니다.");
    }
}