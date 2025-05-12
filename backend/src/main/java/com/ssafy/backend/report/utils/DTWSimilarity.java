package com.ssafy.backend.report.utils;

import org.springframework.stereotype.Component;

@Component
public class DTWSimilarity {
    // DTW 유사도 계산 함수
    public double calculateDTW(double[] graph1, double[] graph2) {
        int n = graph1.length;
        int m = graph2.length;

        // 빈 배열 처리
        if (n == 0 || m == 0) {
            return Double.POSITIVE_INFINITY; // 거리 계산 불가 시 무한대 반환
        }

        // 누적 거리 행렬 초기화
        double[][] dtw = new double[n][m];

        // 첫 번째 거리 초기화 (첫 값의 거리)
        dtw[0][0] = euclideanDistance(graph1[0], graph2[0]);

        // 첫 번째 행 초기화
        for (int j = 1; j < m; j++) {
            dtw[0][j] = dtw[0][j - 1] + euclideanDistance(graph1[0], graph2[j]);
        }

        // 첫 번째 열 초기화
        for (int i = 1; i < n; i++) {
            dtw[i][0] = dtw[i - 1][0] + euclideanDistance(graph1[i], graph2[0]);
        }

        // DTW 거리 계산
        for (int i = 1; i < n; i++) {
            for (int j = 1; j < m; j++) {
                double cost = euclideanDistance(graph1[i], graph2[j]);
                double minPrev = Math.min(Math.min(dtw[i - 1][j],    // 위쪽
                                dtw[i][j - 1]),   // 왼쪽
                        dtw[i - 1][j - 1]);       // 대각선
                dtw[i][j] = cost + minPrev;
            }
        }

        // 최종 DTW 거리 반환
        return dtw[n - 1][m - 1];
    }

    // 유클리디안 거리 계산 함수
    private double euclideanDistance(double a, double b) {
        return Math.abs(a - b); // 절대값 사용
    }
//    public static void main(String[] args) {
//        // LH 서지 그래프 (예시)
//        double[] lhSurge = {1, 2, 10, 2, 1};
//
//        // 비교 대상 그래프들
//        double[] graph1 = {1, 3, 9, 3, 1};  // 유사 패턴
//        double[] graph2 = {5, 6, 7, 6, 5};  // 완만한 곡선
//        double[] graph3 = {0, 0, 10, 0, 0}; // 급격한 스파이크
//        double[] graph4 = {1, 2, 3};        // 더 짧은 그래프
//        double[] graph5 = {0, 0, 0, 0, 0};  // 모든 값이 0인 그래프
//
//        double[][] graphs = {graph1, graph2, graph3, graph4, graph5};
//
//        for (int i = 0; i < graphs.length; i++) {
//            double dtwDistance = calculateDTW(lhSurge, graphs[i]);
//            System.out.printf("그래프 %d와 LH 서지의 DTW 유사도: %.3f\n", i + 1, dtwDistance);
//        }
//    }
}
