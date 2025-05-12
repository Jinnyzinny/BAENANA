package com.ssafy.backend.report.utils;

import org.springframework.stereotype.Component;

@Component
public class DTWSimilarity {
    // 유클리디안 거리 계산
    private static double euclideanDistance(double a, double b) {
        return Math.pow(a - b, 2);
    }

    // DTW 유사도 계산 함수
    public static double calculateDTW(double[] graph1, double[] graph2) {
        int n = graph1.length;
        int m = graph2.length;

        // 누적 거리 행렬 초기화
        double[][] dtw = new double[n][m];

        // 무한대 값으로 초기화
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                dtw[i][j] = Double.POSITIVE_INFINITY;
            }
        }
        dtw[0][0] = 0;

        // DTW 거리 계산
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                double cost = euclideanDistance(graph1[i], graph2[j]);
                if (i == 0 && j == 0) {
                    dtw[i][j] = cost;
                } else if (i == 0) {
                    dtw[i][j] = cost + dtw[i][j - 1];
                } else if (j == 0) {
                    dtw[i][j] = cost + dtw[i - 1][j];
                } else {
                    double minPrev = Math.min(Math.min(dtw[i - 1][j],    // 위
                                    dtw[i][j - 1]),   // 왼쪽
                            dtw[i - 1][j - 1]);// 대각선
                    dtw[i][j] = cost + minPrev;
                }
            }
        }

        // 최종 DTW 거리 반환
        return Math.sqrt(dtw[n - 1][m - 1]);
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
