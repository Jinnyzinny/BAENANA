package com.ssafy.backend.home.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class alarmResDto {
	
	private String reservation;
	private String medicine;
}
