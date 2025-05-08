package com.ssafy.backend.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserDto {
    private String socialId;
    private String provider;
    private String role;
}
