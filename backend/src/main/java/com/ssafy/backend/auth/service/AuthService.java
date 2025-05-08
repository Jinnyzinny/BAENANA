package com.ssafy.backend.auth.service;

import com.ssafy.backend.auth.dto.RefreshTokenRequest;
import com.ssafy.backend.auth.dto.TokenResponse;
import com.ssafy.backend.auth.jwt.JwtProvider;
import com.ssafy.backend.common.exception.UnauthorizedException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtProvider jwtProvider;

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
}