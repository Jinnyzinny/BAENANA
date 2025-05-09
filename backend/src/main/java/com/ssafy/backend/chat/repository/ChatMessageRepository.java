package com.ssafy.backend.chat.repository;

import com.ssafy.backend.chat.entity.ChatMessages;
import com.ssafy.backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessages, Long> {

    List<ChatMessages> findBySessionIdOrderByCreatedAt(String sessionId);
    List<ChatMessages> findByUser(User user);
    List<ChatMessages> findTop1ByUserAndSessionIdOrderByCreatedAtDesc(User user, String sessionId);

}
