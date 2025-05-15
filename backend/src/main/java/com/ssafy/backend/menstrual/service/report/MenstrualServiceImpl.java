package com.ssafy.backend.menstrual.service.report;

import com.ssafy.backend.common.ApiResponse;
import com.ssafy.backend.menstrual.entity.MenstrualCycle;
import com.ssafy.backend.menstrual.exception.OvulationTestException;
import com.ssafy.backend.menstrual.exception.OvulationTestStandardException;
import com.ssafy.backend.menstrual.repository.MenstrualCycleRepository;
import com.ssafy.backend.ovulation_test.entity.OvulationTest;
import com.ssafy.backend.ovulation_test.entity.OvulationTestStandard;
import com.ssafy.backend.ovulation_test.repository.OvulationTestRepository;
import com.ssafy.backend.ovulation_test.repository.OvulationTestStandardRepository;
import com.ssafy.backend.ovulation_test.repository.custom.OvulationTestCustomRepository;
import com.ssafy.backend.report.dto.request.AddOvulationTestReqDto;
import com.ssafy.backend.report.dto.response.GetAllMenstrualResDto;
import com.ssafy.backend.report.dto.response.GetMenstrualInfoResDto;
import com.ssafy.backend.report.dto.response.GetOvulationTestResDto;
import com.ssafy.backend.report.dto.response.GetRecentMenstrualResDto;
import com.ssafy.backend.report.dto.service.GetCycleDto;
import com.ssafy.backend.report.utils.DTWSimilarity;
import com.ssafy.backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;


@Service
@Transactional
@RequiredArgsConstructor
public class MenstrualServiceImpl implements MenstrualService {
    private final MenstrualCycleRepository menstrualCycleRepository;

    private final OvulationTestRepository ovulationTestRepository;
    private final OvulationTestCustomRepository ovulationTestCustomRepository;
    private final OvulationTestStandardRepository ovulationTestStandardRepository;

    private final DTWSimilarity dtwSimilarity;


    @Override
    public ApiResponse<?> getMenstrualInfo(User user) {
        /*
         * 사용자의 userId를 얻는다
         * */
        Long userId = user.getUserId();

        /*
         * 사용자의 생리 주기 4개월치 기록을 얻는다
         * */
        List<MenstrualCycle> menstrualCycleList =
                menstrualCycleRepository.findTop4ByUser_UserIdOrderByStartDateDesc(userId).orElse(null);

        /*
         * 만약 생리 주기 기록이 없을 경우 없다고 메시지를 반환한다.
         * */
        if (menstrualCycleList == null || menstrualCycleList.isEmpty()) {
            return ApiResponse.success("사용자의 주기 정보가 없어 월경 정보(주기,기간)을 제공하는 데 실패했습니다.");
        }

        /*
         * 평균을 구할 주기의 합과 기간의 합 변수를 생성한다.
         * */
        int cycleSum = 0;
        int periodSum = 0;

        /*
         * 최대 주기 값과 최소 주기 값을 초기화한다.
         * */
        int maxCycle = Integer.MIN_VALUE;
        int minCycle = Integer.MAX_VALUE;

        /*
         * 해당 결괏값을 순회하면서 주기값들을 추출한다.
         * */
        for (int i = 0; i < menstrualCycleList.size(); i++) {
            LocalDate endDate = menstrualCycleList.get(i).getEndDate();
            LocalDate startDate = menstrualCycleList.get(i).getStartDate();

            if (i >= 1) {
                LocalDate prevStartDate = menstrualCycleList.get(i - 1).getStartDate();
                int cycle = (int) ChronoUnit.DAYS.between(startDate, prevStartDate);
                cycleSum += cycle;
                if (maxCycle >= 40 || minCycle <= 17) {
                    //극단 값들은 버린다.
                    continue;
                }
                maxCycle = Math.max(maxCycle, cycle);
                minCycle = Math.min(minCycle, cycle);
            }
            periodSum += (int) ChronoUnit.DAYS.between(startDate, endDate);
        }
        int avgCycle = cycleSum / menstrualCycleList.size();
        int avgPeriod = periodSum / menstrualCycleList.size();

        List<Integer> periods = menstrualCycleList
                .stream()
                .map(cycle -> (int) ChronoUnit.DAYS.between(cycle.getStartDate(), cycle.getEndDate()))
                .toList();

        // 평균 계산
        double mean = periods.stream().mapToDouble(Integer::doubleValue).average().orElse(0.0);

        // 분산 계산
        double variance = periods.stream()
                .mapToDouble(period -> Math.pow(period - mean, 2))
                .sum() / periods.size();
        // 표준편차 계산
        double stddev = Math.sqrt(variance);

        boolean normalCycle = maxCycle - minCycle >= 7;
        boolean normalPeriod = stddev > 2;
        return ApiResponse.success("사용자의 주기 정보입니다",
                GetMenstrualInfoResDto.builder()
                        .cycle(avgCycle)
                        .period(avgPeriod)
                        /*
                         *정상 판별 어떻게 할 예정 : 3개월치로 최댓값과 최솟값의 차이를 비교해서 7일 이상이 나면 이상으로 판단.
                         */
                        .is_cycle_normal(normalCycle)
                        .is_period_normal(normalPeriod)
                        .build());
    }

    @Override
    public ApiResponse<?> addOvulationTest(User user, AddOvulationTestReqDto request) {
        ovulationTestRepository.save(
                OvulationTest.builder()
                        .user(user)
                        .date(request.getDate())
                        .value(request.getValue())
                        .build()
        );
        return ApiResponse.success("사용자의 배란 테스트 결과가 저장되었습니다.");
    }


    @Override
    public ApiResponse<?> getOvulationTest(User user) {
        Long userId = user.getUserId();

        /*
         * 기준이 될 그래프 타입 전체를 DB에서 불러온다
         * */
        List<OvulationTestStandard> ovulationTestStandard
                = ovulationTestStandardRepository.findAll();

        /*
         * 그래프 타입에 맞추어 분류할 기준 그래프 3개를 리스트 배열로 선언한다.
         * */
        List<OvulationTestStandard>[] graphType = new ArrayList[4];
        /*
         * 초기화한다.
         * */
        for (int i = 0; i < graphType.length; i++) {
            graphType[i] = new ArrayList<>();
        }

        /*
         * 해당 원소의 Type에 따라 분류한다.
         * */
        for (OvulationTestStandard standard : ovulationTestStandard) {
            switch (standard.getType()) {
                case 1:
                    graphType[1].add(standard);
                    break;
                case 2:
                    graphType[2].add(standard);
                    break;
                case 3:
                    graphType[3].add(standard);
                    break;
            }
        }

        /*
         * 검색을 할 주기 시작일을 찾는다.
         * */
        MenstrualCycle menstrualCycle =
                menstrualCycleRepository.findFirstByUser_UserIdOrderByStartDateDesc(userId).orElse(null);
        if (menstrualCycle == null) {
            return ApiResponse.success("사용자의 주기 시작일이 존재하지 않아 배란 테스트 결과를 제공하는 데 실패했습니다.");
        }

//        사용자의 가장 최근 검사 결과리스트를 불러온다.
        Map<LocalDate, Double> recentOvulationTest =
                ovulationTestCustomRepository.findByUserAndDateAfter(user, menstrualCycle.getStartDate()).orElseThrow(
                        () -> new OvulationTestException("사용자의 최근 검사 결과 리스트가 존재하지 않습니다")
                );

//        사용자의 배란 주기 데이터를 확인해서 1번,2번,3번 그래프 중 어디에 더 맞는지 확인
        int type = Integer.MAX_VALUE;
        double distance = Double.MAX_VALUE;

        for (int i = 1; i < graphType.length; i++) {
            if (graphType[i].isEmpty()) continue;

            // 1) 기준 그래프 전체 배열, 사용자 그래프 배열 준비
            double[] standardGraph = graphType[i].stream()
                    .mapToDouble(OvulationTestStandard::getValue)
                    .toArray();

            double[] userGraph = recentOvulationTest.entrySet().stream()
                    .sorted(Map.Entry.comparingByKey())
                    .mapToDouble(Map.Entry::getValue)
                    .toArray();

            System.out.println(standardGraph.length + " " + userGraph.length);

            // 2) 슬라이딩 윈도우로 기준 그래프에서 userGraph 길이만큼 잘라가며 DTW 계산
            int winSize = userGraph.length;
            double minDistance = Double.MAX_VALUE;
            for (int offset = 0; offset <= standardGraph.length - winSize; offset++) {
                double[] window = Arrays.copyOfRange(standardGraph, offset, offset + winSize);
                double dist = dtwSimilarity.calculateDTW(window, userGraph);
                if (dist < minDistance) {
                    minDistance = dist;
                }
            }

            // 3) 최종 minDistance를 기존 distance 비교에 사용
            if (minDistance < distance) {
                type = i;
                distance = minDistance;
            }

        }
        if (type == Integer.MAX_VALUE) {
//            예외 처리해야한다.
            throw new OvulationTestStandardException("기준에 일치하는 그래프가 없습니다. 즉 사용자의 데이터가 현저히 부족합니다.");
        }
        /*
         * 이 시점에서 어느 기준 그래프와 가장 유사한지 DTW 거리가 나온다.
         * 그렇다면 기준 그래프와 사용자의 그래프에 Date를 추가해서 결괏값으로 반환한다.
         * */
        List<GetOvulationTestResDto.datePerValue> standardTestList = new ArrayList<>();
        List<GetOvulationTestResDto.datePerValue> userTestList = new ArrayList<>();

        for (int i = 0; i < graphType[type].size(); i++) {
            LocalDate startDate = menstrualCycle.getStartDate();

            standardTestList.add(
                    new GetOvulationTestResDto.datePerValue(
                            startDate.plusDays(i).toString(),
                            graphType[type].get(i).getValue()
                    )
            );
            if (recentOvulationTest.containsKey(startDate.plusDays(i))) {
                userTestList.add(
                        new GetOvulationTestResDto.datePerValue(
                                startDate.plusDays(i).toString(),
                                recentOvulationTest.get(startDate.plusDays(i))
                        )
                );
            }
        }

        return ApiResponse.success("배란 테스트 정보입니다.",
                GetOvulationTestResDto.builder()
                        .normal(type)
                        .standard(standardTestList)
                        .personal_data(userTestList)
                        .build());
    }

    @Override
    public ApiResponse<?> getRecentMenstrual(User user) {
        Long userId = user.getUserId();
        List<MenstrualCycle> menstrualCycleList =
                menstrualCycleRepository.findTop6ByUser_UserIdOrderByStartDateDesc(userId).orElse(null);

        if (menstrualCycleList == null || menstrualCycleList.isEmpty()) {
            return ApiResponse.success("사용자의 최근 주기 정보가 없습니다.");
        }

        GetCycleDto cycle = getCycleTerm(menstrualCycleList);
        return ApiResponse.success("사용자의 최근 6개월 주기 정보를 불러옵니다.",
                GetRecentMenstrualResDto.builder()
                        .average_cycle(cycle.getAverageCycle())
                        .max_cycle(cycle.getMaxCycle())
                        .cycle_record(cycle.getCycleRecord())
                        .build());
    }

    @Override
    public ApiResponse<?> getAllMenstrual(User user) {
        Long userId = user.getUserId();

        List<MenstrualCycle> menstrualCycleList =
                menstrualCycleRepository.findByUser_UserIdOrderByStartDateDesc(userId).orElse(null);

        if (menstrualCycleList == null || menstrualCycleList.isEmpty()) {
            return ApiResponse.success("사용자의 주기 정보가 없습니다.");
        }

        GetCycleDto cycle = getCycleTerm(menstrualCycleList);
        return ApiResponse.success(
                "사용자의 전체 주기 정보를 불러옵니다.",
                GetAllMenstrualResDto.builder()
                        .average_cycle(cycle.getAverageCycle())
                        .max_cycle(cycle.getMaxCycle())
                        .cycle_record(cycle.getCycleRecord())
                        .build()
        );
    }

    public GetCycleDto getCycleTerm(List<MenstrualCycle> menstrualCycleList) {
        int cycleSum = 0;
        int maxCycle = Integer.MIN_VALUE;
        for (int i = 1; i < menstrualCycleList.size(); i++) {
            LocalDate startDate = menstrualCycleList.get(i).getStartDate();
            LocalDate prevStartDate = menstrualCycleList.get(i - 1).getStartDate();

            maxCycle = Math.max(maxCycle, (int) ChronoUnit.DAYS.between(prevStartDate, startDate));
            cycleSum += (int) ChronoUnit.DAYS.between(startDate, prevStartDate);
        }
        List<GetRecentMenstrualResDto.each_cycle_record> cycleRecord = new ArrayList<>();

        for (MenstrualCycle cycle : menstrualCycleList) {
            cycleRecord.add(GetRecentMenstrualResDto.each_cycle_record.builder()
                    .start_date(cycle.getStartDate().toString())
                    .end_date(cycle.getEndDate().toString())
                    .period((int) ChronoUnit.DAYS.between(cycle.getStartDate(), cycle.getEndDate()))
                    .build());
        }
        int averageCycle = cycleSum / menstrualCycleList.size();

        return GetCycleDto.builder()
                .averageCycle(averageCycle)
                .maxCycle(maxCycle)
                .cycleRecord(cycleRecord)
                .build();
    }
}
