package com.ssafy.backend.auth.handler;


import com.ssafy.backend.auth.dto.LoginResponse;
import com.ssafy.backend.auth.dto.UserDto;
import com.ssafy.backend.auth.jwt.JwtProvider;
import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.user.entity.User;
import com.ssafy.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    private final ObjectMapper objectMapper;
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

        UserDto userDto = new UserDto(user.getSocialId(), user.getProvider(), user.getRole().toString());
        LoginResponse loginResponse = new LoginResponse(accessToken, refreshToken, userDto);
        ApiResponse<LoginResponse> apiResponse = ApiResponse.success("OAuth2 로그인이 완료되었습니다.", HttpStatus.OK, loginResponse);

        response.setContentType("application/json; charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        objectMapper.writeValue(response.getWriter(), apiResponse);
    }
}
