package com.ssafy.backend.auth.handler;


import com.ssafy.backend.auth.jwt.JwtProvider;
import com.ssafy.backend.user.entity.User;
import com.ssafy.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        // socialId (카카오 id)
        String socialId = String.valueOf(attributes.get("id"));
        String provider = "kakao"; // 또는 동적으로 뽑아도 됨

        // DB에서 사용자 조회 (이미 CustomOAuth2UserService에서 저장했으므로 반드시 존재)
        User user = userRepository.findBySocialIdAndProvider(socialId, provider)
                .orElseThrow(() -> new RuntimeException("User not found after OAuth2 login."));

        // JWT 생성
        String accessToken = jwtProvider.generateAccessToken(String.valueOf(user.getUserId()));
        String refreshToken = jwtProvider.generateRefreshToken(String.valueOf(user.getUserId()));

        // 응답 설정
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_OK);

        objectMapper.writeValue(response.getWriter(), Map.of(
                "message", "OAuth2 login success",
                "accessToken", accessToken,
                "refreshToken", refreshToken,
                "user", Map.of(
                        "socialId", user.getSocialId(),
                        "provider", user.getProvider(),
                        "role", user.getRole()
                )
        ));
    }
}
