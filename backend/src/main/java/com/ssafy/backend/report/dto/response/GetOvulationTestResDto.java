package com.ssafy.backend.report.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
public class GetOvulationTestResDto{
    private int type;
    private List<datePerValue> standard;
    private List<datePerValue> personal_data;

    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static  class datePerValue{
        String date;
        double value;
    }
}
