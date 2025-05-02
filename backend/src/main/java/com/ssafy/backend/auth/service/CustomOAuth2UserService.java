package com.ssafy.backend.auth.service;

import com.ssafy.backend.user.entity.User;
import com.ssafy.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // 카카오에서 사용자 정보 가져오기
        OAuth2User oAuth2User = new DefaultOAuth2UserService().loadUser(userRequest);
        Map<String, Object> attributes = oAuth2User.getAttributes();

        // 카카오 고유 ID 추출
        String socialId = String.valueOf(attributes.get("id"));
        String provider = userRequest.getClientRegistration().getRegistrationId(); // "kakao"

        // 우리 DB에 사용자 있는지 조회하고 없으면 생성
        User user = userRepository.findBySocialIdAndProvider(socialId, provider)
                .orElseGet(() -> userRepository.save(User.builder()
                        .socialId(socialId)
                        .provider(provider)
                        .role("USER")
                        .allowAlarm(true)
                        .createdAt(LocalDateTime.now())
                        .isDeleted(false)
                        .build()));

        // Spring Security 기본 OAuth2User로 반환
        user.setAttributes(attributes);
        return user;
    }
}
