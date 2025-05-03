package com.ssafy.backend.home.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MedicineResDto {
	
	private String reservation;
	private String medicine;
}
