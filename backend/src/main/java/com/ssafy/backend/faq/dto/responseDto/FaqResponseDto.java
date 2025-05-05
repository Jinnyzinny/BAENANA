package com.ssafy.backend.faq.dto.responseDto;

import com.ssafy.backend.faq.entity.Faq;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class FaqResponseDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Detail {
        private Long faqId;
        private String question;
        private String answer;
        private LocalDateTime createdAt;

        public static Detail fromEntity(Faq faq) {
            return Detail.builder()
                    .faqId(faq.getFaqId())
                    .question(faq.getQuestion())
                    .answer(faq.getAnswer())
                    .createdAt(faq.getCreatedAt())
                    .build();
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class List {
        private Long faqId;
        private String question;
        private LocalDateTime createdAt;

        public static List fromEntity(Faq faq) {
            return List.builder()
                    .faqId(faq.getFaqId())
                    .question(faq.getQuestion())
                    .createdAt(faq.getCreatedAt())
                    .build();
        }

        public static java.util.List<List> fromEntities(java.util.List<Faq> faqs) {
            return faqs.stream()
                    .map(List::fromEntity)
                    .collect(Collectors.toList());
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Create {
        private Long faqId;
    }
}