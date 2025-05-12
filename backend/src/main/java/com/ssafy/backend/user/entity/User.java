package com.ssafy.backend.user.entity;

import com.ssafy.backend.chat.entity.ChatMessages;
import com.ssafy.backend.hospital.entity.HospitalReservation;
import com.ssafy.backend.inquiry.entity.Inquiry;
import com.ssafy.backend.medication.entity.Medication;
import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import com.ssafy.backend.ovulation_test.entity.OvulationTest;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails, OAuth2User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    /*
    * =====연관 관계=====
    * */
    @OneToMany(mappedBy = "user")
    private List<MenstrualCycle> cycles;

    @OneToMany(mappedBy = "user")
    private List<HospitalReservation> hospitalReservations;
    

    @OneToMany(mappedBy = "user")
    private List<Medication> medications;

    @OneToMany(mappedBy = "user")
    private List<Inquiry> inquiries;

    @OneToMany(mappedBy = "user")
    private List<ChatMessages> chatMessages;

    @OneToMany(mappedBy = "user")
    private List<OvulationTest> ovulationTests;

    /*
    * =====Column=====
    * */
    private String socialId;
    private String provider;
    private String role;
    private Boolean allowAlarm;
    private LocalDateTime createdAt;
    private Boolean isDeleted;
    private LocalDateTime deletedAt;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(() -> this.role); // ex) "ROLE_USER"
    }

    @Override
    public String getUsername() {
        return this.socialId; // 사용자 식별자
    }

    @Override
    public String getPassword() {
        return null; // 소셜 로그인만 하니까 null 반환
    }

    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return !this.isDeleted; }
    @Transient
    private Map<String, Object> attributes;

    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return this.attributes;
    }

    @Override
    public String getName() {
        return this.socialId;
    }

}
