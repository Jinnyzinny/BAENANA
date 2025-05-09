package com.ssafy.backend.faq.service;

import com.ssafy.backend.faq.entity.Faq;
import com.ssafy.backend.faq.dto.requestDto.FaqRequestDto;
import com.ssafy.backend.faq.dto.responseDto.FaqResponseDto;
import com.ssafy.backend.faq.exception.FaqNotFoundException;
import com.ssafy.backend.faq.repository.FaqRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FaqService {

    private final FaqRepository faqRepository;

    /**
     * FAQ 목록을 조회합니다.
     * @return FAQ 목록
     */
    @Transactional(readOnly = true)
    public List<FaqResponseDto.List> getAllFaqs() {
        List<Faq> faqs = faqRepository.findAllByOrderByCreatedAtDesc();
        return FaqResponseDto.List.fromEntities(faqs);
    }

    /**
     * FAQ 상세 정보를 조회합니다.
     * @param faqId FAQ ID
     * @return FAQ 상세 정보
     */
    @Transactional(readOnly = true)
    public FaqResponseDto.Detail getFaqById(Long faqId) {
        Faq faq = faqRepository.findById(faqId)
                .orElseThrow(() -> new FaqNotFoundException("존재하지 않는 FAQ입니다."));

        return FaqResponseDto.Detail.fromEntity(faq);
    }

    /**
     * 새로운 FAQ를 생성합니다.
     * @param request FAQ 생성 요청 DTO
     * @param userId 생성자 ID
     * @return 생성된 FAQ ID
     */
    @Transactional
    public FaqResponseDto.Create createFaq(FaqRequestDto.Create request, Long userId) {
        Faq faq = Faq.builder()
                .question(request.getQuestion())
                .answer(request.getAnswer())
                .createdAt(LocalDateTime.now())
                .createdBy(userId)
                .build();

        Faq savedFaq = faqRepository.save(faq);

        return FaqResponseDto.Create.builder()
                .faqId(savedFaq.getFaqId())
                .build();
    }

    /**
     * FAQ를 수정합니다.
     * @param faqId 수정할 FAQ ID
     * @param request FAQ 수정 요청 DTO
     * @return 수정된 FAQ ID
     */
    @Transactional
    public FaqResponseDto.Create updateFaq(Long faqId, FaqRequestDto.Update request) {
        Faq faq = faqRepository.findById(faqId)
                .orElseThrow(() -> new FaqNotFoundException("수정할 FAQ가 존재하지 않습니다."));

        faq.update(request.getQuestion(), request.getAnswer());

        return FaqResponseDto.Create.builder()
                .faqId(faq.getFaqId())
                .build();
    }

    /**
     * FAQ를 삭제합니다.
     * @param faqId 삭제할 FAQ ID
     */
    @Transactional
    public void deleteFaq(Long faqId) {
        if (!faqRepository.existsById(faqId)) {
            throw new FaqNotFoundException("삭제할 FAQ가 존재하지 않습니다.");
        }

        faqRepository.deleteById(faqId);
    }
}