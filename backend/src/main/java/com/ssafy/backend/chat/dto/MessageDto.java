package com.ssafy.backend.chat.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MessageDto {
    private String sender;
    private String message;
    private String createdAt;
}