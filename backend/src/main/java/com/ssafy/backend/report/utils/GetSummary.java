package com.ssafy.backend.report.utils;

import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import com.ssafy.backend.menstrual.entity.MenstrualDailyLog;
import com.ssafy.backend.symptomLog.entity.SymptomLog;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class GetSummary {
    public Boolean getMenstrualNormal(List<MenstrualCycle> cycleList) {
        return true;
    }

    public String getBleedingLevel(List<MenstrualCycle> cycleList) {
        int bleedingLevel = 0;
        int bleedingDay = 0;
        for (int i = 0; i < cycleList.size(); i++) {
            for (int day = 0; day < cycleList.get(i).getLogs().size(); day++) {
                bleedingDay++;
                bleedingLevel += cycleList.get(i).getLogs().get(day).getBleedingLevel();
            }
        }
        if (Math.round((double) bleedingLevel / bleedingDay) <= 1) {
            return "출혈량이 매우 적습니다.";
        } else if (Math.round((double) bleedingLevel / bleedingDay) == 2) {
            return "출혈량이 적습니다.";
        } else if (Math.round((double) bleedingLevel / bleedingDay) == 3) {
            return "출혈량이 보통입니다.";
        } else if (Math.round((double) bleedingLevel / bleedingDay) == 4) {
            return "출혈량이 많습니다";
        } else {
            return "출혈량이 매우 많습니다";
        }
    }

    public String getSymptoms(List<MenstrualCycle> cycleList) {
        List<String> symptoms = cycleList.stream()
                .flatMap(cycle -> cycle.getLogs().stream())
                .flatMap(log -> log.getSymptomLog().stream())
                .map(SymptomLog::getSymptomType) // 또는 .name(), toString() 등 필요에 따라
                .distinct()
                .toList();

        if (symptoms.isEmpty()) {
            return "증상이 기록되지 않았습니다.";
        }

        String joinedSymptoms = String.join(", ", symptoms);
        return joinedSymptoms + " 증상이 있었습니다.";
    }

    public Boolean getStressNormal(List<MenstrualCycle> cycleList) {
        return true;
    }

    public String getStressMessage(List<MenstrualCycle> cycleList) {
        double sum = 0;
        for (MenstrualCycle cycle : cycleList) {
            for (MenstrualDailyLog dailyLog : cycle.getLogs()) {
                if (dailyLog.getStressLevel() != null)
                    sum += dailyLog.getStressLevel();
            }
        }
        sum /= cycleList.size();
        int stress_level = (int) (Math.round(sum * 100) / 100.0);
        if (stress_level == 0) {
            return "최근 3개월 스트레스 지수가 없습니다.";
        } else if (stress_level == 1) {
            return "최근 3개월 스트레스 지수가 매우 낮습니다.";
        } else if (stress_level == 2) {
            return "최근 3개월 스트레스 지수가 낮습니다.";
        } else if (stress_level == 3) {
            return "최근 3개월 스트레스 지수가 보통입니다.";
        } else if (stress_level == 4) {
            return "최근 3개월 스트레스 지수가 높습니다.";
        } else if (stress_level == 5) {
            return "최근 3개월 스트레스 지수가 매우 높습니다.";
        } else {
            return "스트레스 지수가 매우 높습니다";
        }
    }
}
