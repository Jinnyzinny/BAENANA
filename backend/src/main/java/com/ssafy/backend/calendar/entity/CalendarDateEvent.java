package com.ssafy.backend.calendar.entity;

import jakarta.persistence.MappedSuperclass;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@MappedSuperclass
@Getter
public abstract class CalendarDateEvent {
    protected LocalDate startDate;
    protected LocalDate endDate;
}
