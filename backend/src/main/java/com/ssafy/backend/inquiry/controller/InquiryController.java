package com.ssafy.backend.inquiry.controller;

import com.ssafy.backend.inquiry.dto.requestDto.InquiryRequestDto;
import com.ssafy.backend.inquiry.dto.responseDto.InquiryResponseDto;
import com.ssafy.backend.inquiry.service.InquiryService;
import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.common.exception.ForbiddenException;
import com.ssafy.backend.common.exception.UnauthorizedException;
import com.ssafy.backend.user.entity.User;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inquiries")
@RequiredArgsConstructor
public class InquiryController {

    private final InquiryService inquiryService;

    // (사용자) 문의 작성
    @PostMapping
    public ApiResponse<InquiryResponseDto.Create> createInquiry(
            @RequestBody @Valid InquiryRequestDto.Create request,
            @AuthenticationPrincipal User user) {

        if (user == null) {
            throw new UnauthorizedException("로그인이 필요합니다.");
        }

        InquiryResponseDto.Create response = inquiryService.createInquiry(request, user);
        return ApiResponse.success("문의가 정상적으로 등록되었습니다.", HttpStatus.CREATED, response);
    }

    // (사용자) 문의 목록 조회
    @GetMapping("/my")
    public ApiResponse<InquiryResponseDto.PagedList<InquiryResponseDto.ListItem>> getMyInquiries(
            @AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        if (user == null) {
            throw new UnauthorizedException("로그인이 필요합니다.");
        }

        Pageable pageable = PageRequest.of(page, size);
        InquiryResponseDto.PagedList<InquiryResponseDto.ListItem> response = inquiryService.getMyInquiries(user, pageable);
        return ApiResponse.success("문의 목록이 조회되었습니다.", response);
    }


    // (사용자) 문의 상세 조회
    @GetMapping("/{inquiryId}")
    public ApiResponse<InquiryResponseDto.Detail> getMyInquiryDetail(
            @PathVariable Long inquiryId,
            @AuthenticationPrincipal User user) {

        if (user == null) {
            throw new UnauthorizedException("로그인이 필요합니다.");
        }

        InquiryResponseDto.Detail response = inquiryService.getMyInquiryDetail(inquiryId, user);
        return ApiResponse.success("문의 상세 정보가 조회되었습니다.", response);
    }

    // (사용자) 문의 수정
    @PatchMapping("/{inquiryId}")
    public ApiResponse<InquiryResponseDto.Update> updateInquiry(
            @PathVariable Long inquiryId,
            @RequestBody @Valid InquiryRequestDto.Update request,
            @AuthenticationPrincipal User user) {

        if (user == null) {
            throw new UnauthorizedException("로그인이 필요합니다.");
        }

        InquiryResponseDto.Update response = inquiryService.updateInquiry(inquiryId, request, user);
        return ApiResponse.success("문의가 수정되었습니다.", response);
    }

    // (사용자) 문의 삭제
    @DeleteMapping("/{inquiryId}")
    public ApiResponse<?> deleteInquiry(
            @PathVariable Long inquiryId,
            @AuthenticationPrincipal User user) {

        if (user == null) {
            throw new UnauthorizedException("로그인이 필요합니다.");
        }

        inquiryService.deleteInquiry(inquiryId, user);
        return ApiResponse.success("문의가 삭제되었습니다.");
    }

    // (관리자) 문의 목록 조회
    @GetMapping("/admin")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ApiResponse<InquiryResponseDto.PagedList<InquiryResponseDto.AdminListItem>> getAllInquiries(
            @AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        if (user == null) {
            throw new UnauthorizedException("로그인이 필요합니다.");
        }

        if (!"ADMIN".equals(user.getRole())) {
            throw new ForbiddenException("접근 권한이 없습니다.");
        }

        Pageable pageable = PageRequest.of(page, size);
        InquiryResponseDto.PagedList<InquiryResponseDto.AdminListItem> response = inquiryService.getAllInquiries(pageable);
        return ApiResponse.success("문의 목록이 조회되었습니다.", response);
    }

    // (관리자) 특정 문의 상세 조회
    @GetMapping("/admin/{inquiryId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ApiResponse<InquiryResponseDto.Detail> getInquiryDetail(
            @PathVariable Long inquiryId,
            @AuthenticationPrincipal User user) {

        if (user == null) {
            throw new UnauthorizedException("로그인이 필요합니다.");
        }

        if (!"ADMIN".equals(user.getRole())) {
            throw new ForbiddenException("접근 권한이 없습니다.");
        }

        InquiryResponseDto.Detail response = inquiryService.getInquiryDetail(inquiryId);
        return ApiResponse.success("문의 상세 정보가 조회되었습니다.", response);
    }

    // (관리자) 문의 답변 작성
    @PostMapping("/admin/{inquiryId}/answer")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ApiResponse<InquiryResponseDto.Create> createAnswer(
            @PathVariable Long inquiryId,
            @RequestBody @Valid InquiryRequestDto.AnswerCreate request,
            @AuthenticationPrincipal User user) {

        if (user == null) {
            throw new UnauthorizedException("로그인이 필요합니다.");
        }

        if (!"ADMIN".equals(user.getRole())) {
            throw new ForbiddenException("접근 권한이 없습니다.");
        }

        InquiryResponseDto.Create response = inquiryService.createAnswer(inquiryId, request, user);
        return ApiResponse.success("답변이 등록되었습니다.", HttpStatus.CREATED, response);
    }

    // (관리자) 문의 답변 수정
    @PatchMapping("/admin/{inquiryId}/answer")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ApiResponse<InquiryResponseDto.Answer> updateAnswer(
            @PathVariable Long inquiryId,
            @RequestBody @Valid InquiryRequestDto.AnswerUpdate request,
            @AuthenticationPrincipal User user) {

        if (user == null) {
            throw new UnauthorizedException("로그인이 필요합니다.");
        }

        if (!"ADMIN".equals(user.getRole())) {
            throw new ForbiddenException("접근 권한이 없습니다.");
        }

        InquiryResponseDto.Answer response = inquiryService.updateAnswer(inquiryId, request);
        return ApiResponse.success("답변이 수정되었습니다.", response);
    }

    // (관리자) 문의 답변 삭제
    @DeleteMapping("/admin/{inquiryId}/answer")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ApiResponse<InquiryResponseDto.Answer> deleteAnswer(
            @PathVariable Long inquiryId,
            @AuthenticationPrincipal User user) {

        if (user == null) {
            throw new UnauthorizedException("로그인이 필요합니다.");
        }

        if (!"ADMIN".equals(user.getRole())) {
            throw new ForbiddenException("접근 권한이 없습니다.");
        }

        InquiryResponseDto.Answer response = inquiryService.deleteAnswer(inquiryId);
        return ApiResponse.success("답변이 삭제되었습니다.", response);
    }
}