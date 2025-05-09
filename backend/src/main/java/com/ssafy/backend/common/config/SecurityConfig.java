package com.ssafy.backend.common.config;

import com.ssafy.backend.auth.filter.TokenAuthenticationFilter;
import com.ssafy.backend.auth.handler.OAuth2SuccessHandler;
import com.ssafy.backend.auth.jwt.JwtProvider;
import com.ssafy.backend.auth.service.CustomOAuth2UserService;
import com.ssafy.backend.common.security.CustomAccessDeniedHandler;
import com.ssafy.backend.common.security.CustomAuthenticationEntryPoint;
import com.ssafy.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final CustomOAuth2UserService oAuth2UserService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring()
                .requestMatchers("/error", "/favicon.ico");
    }

    @Bean
    public AccessDeniedHandler accessDeniedHandler() {
        return new CustomAccessDeniedHandler();
    }

    @Bean
    public AuthenticationEntryPoint authenticationEntryPoint() {
        return new CustomAuthenticationEntryPoint();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.disable())
                .httpBasic(httpBasic -> httpBasic.disable())
                .formLogin(formLogin -> formLogin.disable())
                .logout(logout -> logout.disable())
                .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // 예외 처리 핸들러 추가 - 위치를 앞쪽으로 이동
                .exceptionHandling(exceptions -> exceptions
                        .accessDeniedHandler(accessDeniedHandler())
                        .authenticationEntryPoint(authenticationEntryPoint())
                )

                .authorizeHttpRequests(requests -> requests
                        .requestMatchers(
                                new AntPathRequestMatcher("/"),
                                new AntPathRequestMatcher("/auth/success"),
                                new AntPathRequestMatcher("/api/auth/**"),
                                new AntPathRequestMatcher("/public/**"),

                                // 공지사항 공개 경로
                                new AntPathRequestMatcher("/api/notifications", "GET"),
                                new AntPathRequestMatcher("/api/notifications/*", "GET"),
                                // FAQ 관련 공개 경로
                                new AntPathRequestMatcher("/api/faq", "GET"),
                                new AntPathRequestMatcher("/api/faq/*", "GET")
                        ).permitAll()
                        // 관리자 전용 경로 설정
                        .requestMatchers(
                                new AntPathRequestMatcher("/api/inquiries/admin/**"),
                                new AntPathRequestMatcher("/api/notifications/admin/**"),
                                new AntPathRequestMatcher("/api/faq/admin/**")
                        ).hasAuthority("ADMIN")
                        // 사용자의 문의사항 공개 경로
                        .requestMatchers(
                                new AntPathRequestMatcher("/api/inquiries", "POST"),
                                new AntPathRequestMatcher("/api/inquiries/my", "GET"),
                                new AntPathRequestMatcher("/api/inquiries/{inquiryId}", "GET"),
                                new AntPathRequestMatcher("/api/inquiries/{inquiryId}", "PATCH"),
                                new AntPathRequestMatcher("/api/inquiries/{inquiryId}", "DELETE")
                        ).authenticated()

                        .anyRequest().authenticated()
                )

                .oauth2Login(oauth -> oauth
                        .userInfoEndpoint(userInfo -> userInfo.userService(oAuth2UserService))
                        .successHandler(oAuth2SuccessHandler)
                )

                .addFilterBefore(
                        new TokenAuthenticationFilter(jwtProvider, userRepository),
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}
