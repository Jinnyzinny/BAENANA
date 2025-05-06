package com.ssafy.backend.inquiry.dto.responseDto;

import com.ssafy.backend.inquiry.entity.Inquiry;
import lombok.*;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class InquiryResponseDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Create {
        private Long inquiryId;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Detail {
        private Long inquiryId;
        private Long userId;
        private String title;
        private String questionContent;
        private LocalDateTime questionDate;
        private String answerContent;
        private LocalDateTime answerDate;
        private String status;

        public static Detail fromEntity(Inquiry inquiry) {
            return Detail.builder()
                    .inquiryId(inquiry.getInquiryId())
                    .userId(inquiry.getUser().getUserId())
                    .title(inquiry.getTitle())
                    .questionContent(inquiry.getQuestionContent())
                    .questionDate(inquiry.getQuestionDate())
                    .answerContent(inquiry.getAnswerContent())
                    .answerDate(inquiry.getAnswerDate())
                    .status(inquiry.getStatus().name())
                    .build();
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ListItem {
        private Long inquiryId;
        private String title;
        private LocalDateTime questionDate;
        private String status;

        public static ListItem fromEntity(Inquiry inquiry) {
            return ListItem.builder()
                    .inquiryId(inquiry.getInquiryId())
                    .title(inquiry.getTitle())
                    .questionDate(inquiry.getQuestionDate())
                    .status(inquiry.getStatus().name())
                    .build();
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AdminListItem {
        private Long inquiryId;
        private Long userId;
        private String title;
        private LocalDateTime questionDate;
        private String status;

        public static AdminListItem fromEntity(Inquiry inquiry) {
            return AdminListItem.builder()
                    .inquiryId(inquiry.getInquiryId())
                    .userId(inquiry.getUser().getUserId())
                    .title(inquiry.getTitle())
                    .questionDate(inquiry.getQuestionDate())
                    .status(inquiry.getStatus().name())
                    .build();
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Update {
        private Long inquiryId;
        private String title;
        private String questionContent;
        private LocalDateTime questionDate;
        private String status;

        public static Update fromEntity(Inquiry inquiry) {
            return Update.builder()
                    .inquiryId(inquiry.getInquiryId())
                    .title(inquiry.getTitle())
                    .questionContent(inquiry.getQuestionContent())
                    .questionDate(inquiry.getQuestionDate())
                    .status(inquiry.getStatus().name())
                    .build();
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Answer {
        private String answerContent;
        private LocalDateTime answerDate;
        private String status;

        public static Answer fromEntity(Inquiry inquiry) {
            return Answer.builder()
                    .answerContent(inquiry.getAnswerContent())
                    .answerDate(inquiry.getAnswerDate())
                    .status(inquiry.getStatus().name())
                    .build();
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PagedList<T> {
        private List<T> content;
        private int page;
        private int size;
        private long totalElements;
        private int totalPages;

        public static <T, E> PagedList<T> fromPage(Page<E> page, java.util.function.Function<E, T> mapper) {
            List<T> content = page.getContent().stream()
                    .map(mapper)
                    .collect(Collectors.toList());

            return PagedList.<T>builder()
                    .content(content)
                    .page(page.getNumber())
                    .size(page.getSize())
                    .totalElements(page.getTotalElements())
                    .totalPages(page.getTotalPages())
                    .build();
        }
    }
}