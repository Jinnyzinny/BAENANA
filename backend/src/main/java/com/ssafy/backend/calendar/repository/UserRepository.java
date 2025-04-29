package com.ssafy.backend.calendar.repository;

import com.ssafy.backend.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
