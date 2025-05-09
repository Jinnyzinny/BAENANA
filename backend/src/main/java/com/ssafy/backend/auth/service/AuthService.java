package com.ssafy.backend.auth.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.auth.dto.LoginResponse;
import com.ssafy.backend.auth.dto.RefreshTokenRequest;
import com.ssafy.backend.auth.dto.TokenResponse;
import com.ssafy.backend.auth.dto.UserDto;
import com.ssafy.backend.auth.jwt.JwtProvider;
import com.ssafy.backend.common.exception.UnauthorizedException;
import com.ssafy.backend.user.entity.User;
import com.ssafy.backend.user.repository.UserRepository;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final ObjectMapper objectMapper;

    public TokenResponse refreshAccessToken(RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();

        try {
            String userId = jwtProvider.extractUserId(refreshToken);

            if (jwtProvider.isTokenExpired(refreshToken)) {
                throw new RuntimeException("리프레시 토큰이 만료되었습니다.");
            }

            String newAccessToken = jwtProvider.generateAccessToken(userId);
            return new TokenResponse(newAccessToken, refreshToken); // 또는 새 refreshToken도 재발급 가능

        } catch (ExpiredJwtException e) {
            throw new UnauthorizedException("리프레시 토큰이 만료되었습니다.");
        } catch (JwtException e) {
            throw new UnauthorizedException("유효하지 않은 리프레시 토큰입니다.");
        }
    }

    public LoginResponse kakaoLogin(String kakaoAccessToken) {
        // 1. 카카오 사용자 정보 조회
        JsonNode userInfo = getUserInfoFromKakao(kakaoAccessToken);

        String socialId = userInfo.get("id").asText();
        String provider = "kakao";

        // 2. 회원 조회 또는 생성
        User user = userRepository.findBySocialIdAndProvider(socialId, provider)
                .map(existingUser -> {
                    if (Boolean.TRUE.equals(existingUser.getIsDeleted())) {
                        existingUser.setIsDeleted(false);
                        existingUser.setDeletedAt(null);
                        userRepository.save(existingUser);
                    }
                    return existingUser;
                })
                .orElseGet(() -> userRepository.save(User.builder()
                        .socialId(socialId)
                        .provider(provider)
                        .role("USER")
                        .allowAlarm(true)
                        .createdAt(LocalDateTime.now())
                        .isDeleted(false)
                        .build()));

        // 3. JWT 발급
        String accessToken = jwtProvider.generateAccessToken(String.valueOf(user.getUserId()));
        String refreshToken = jwtProvider.generateRefreshToken(String.valueOf(user.getUserId()));

        UserDto userDto = new UserDto(user.getSocialId(), user.getProvider(), user.getRole().toString());
        return new LoginResponse(accessToken, refreshToken, userDto);
    }

    private JsonNode getUserInfoFromKakao(String accessToken) {
        try {
            String responseBody = WebClient.create()
                    .get()
                    .uri("https://kapi.kakao.com/v2/user/me")
                    .headers(headers -> headers.setBearerAuth(accessToken))
                    .retrieve()
                    .onStatus(
                            status -> status.is4xxClientError() || status.is5xxServerError(),
                            clientResponse -> clientResponse.bodyToMono(String.class).map(body -> {
                                // 카카오 응답 로그 찍어도 됨: log.warn("카카오 에러 응답: {}", body);
                                throw new UnauthorizedException("카카오 accessToken이 유효하지 않거나 만료되었습니다.");
                            })
                    )
                    .bodyToMono(String.class)
                    .block();

            return objectMapper.readTree(responseBody);

        } catch (UnauthorizedException e) {
            // 위에서 throw한 걸 그대로 유지
            throw e;
        } catch (Exception e) {
            throw new UnauthorizedException("카카오 사용자 정보 요청 중 알 수 없는 오류가 발생했습니다.");
        }
    }

}