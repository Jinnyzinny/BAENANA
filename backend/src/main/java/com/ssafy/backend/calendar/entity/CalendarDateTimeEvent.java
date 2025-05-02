package com.ssafy.backend.calendar.entity;

import jakarta.persistence.MappedSuperclass;
import lombok.Getter;

import java.time.LocalDateTime;

@MappedSuperclass
@Getter
public abstract class CalendarDateTimeEvent {
    protected LocalDateTime startDate;
    protected LocalDateTime endDate;
}
