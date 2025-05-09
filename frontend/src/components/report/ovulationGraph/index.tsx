import { Fragment } from "react";
import { Text, View } from "react-native";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Line,
  Path,
  Text as SvgText,
  Circle,
} from "react-native-svg";

export function OvulationGraph() {
  const graphWidth = 300;
  const graphHeight = 250;
  const padding = 26;
  const xAxisLength = graphWidth - padding * 2;
  const yAxisLength = graphHeight - padding * 2;
  const numberOfYTicks = 7; // 0 ~ 70
  const numberOfXTicks = 10; // 날짜 10개

  // X축 날짜 데이터
  const xDates = [
    "4/28",
    "4/29",
    "4/30",
    "5/1",
    "5/2",
    "5/3",
    "5/4",
    "5/5",
    "5/6",
    "5/7",
  ];

  // Y축 값 데이터
  const purpleYValues = [10, 30, 25, 40, 35, 50, 45, 20, 25, 15];
  const yellowYValues = [10, 20, 15, 20, 45, 50, 30, 40, 30, 5];

  const yTickSpacing = yAxisLength / numberOfYTicks;
  const xTickSpacing = (xAxisLength - 1) / (numberOfXTicks - 1);

  // 점 좌표 생성 함수
  const createPoints = (values: number[]) => {
    return values.map((value, index) => {
      const x = padding + index * xTickSpacing + 5;
      const y = graphHeight - padding - (value / 70) * yAxisLength;
      return { x, y };
    });
  };

  // Path 문자열 생성 함수
  const createPath = (points: { x: number; y: number }[]) => {
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const xMid = (points[i].x + points[i + 1].x) / 2;
      const yMid = (points[i].y + points[i + 1].y) / 2;
      d += ` Q ${points[i].x} ${points[i].y}, ${xMid} ${yMid}`;
    }
    return d;
  };

  const purplePoints = createPoints(purpleYValues);
  const yellowPoints = createPoints(yellowYValues);

  const purplePath = createPath(purplePoints);
  const yellowPath = createPath(yellowPoints);

  const purpleFillPath = `${purplePath} L ${padding + (numberOfXTicks - 1) * xTickSpacing + 5} ${graphHeight - padding} L ${padding + 5} ${graphHeight - padding} Z`;
  const yellowFillPath = `${yellowPath} L ${padding + (numberOfXTicks - 1) * xTickSpacing + 5} ${graphHeight - padding} L ${padding + 5} ${graphHeight - padding} Z`;

  const fertileIndexes = [3, 5]; // 예상 가임기 인덱스
  const ovulationIndex = 4; // 예상 배란일 인덱스

  return (
    <View className="items-center gap-3">
      <Svg width={graphWidth} height={graphHeight}>
        {/* 그라데이션 정의 */}
        <Defs>
          {/* 보라색 그라데이션 */}
          <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#C4B4FF" stopOpacity="0.5" />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </LinearGradient>

          {/* 노란색 그라데이션 */}
          <LinearGradient id="yellowGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#FFF085" stopOpacity="0.5" />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </LinearGradient>
        </Defs>

        {/* 격자와 수평선 */}
        {Array.from({ length: numberOfYTicks + 1 }).map((_, i) => {
          const y = graphHeight - padding - i * yTickSpacing;
          const label = (i * 10).toString();
          const isTop = i === numberOfYTicks;
          const isBottom = i === 0;

          return (
            <Fragment key={`y-${i}`}>
              {/* y축 라벨 */}
              <SvgText
                x={padding - 5}
                y={y}
                fontSize="11"
                fill="#A1A1A1"
                textAnchor="end"
              >
                {label}
              </SvgText>

              {/* 수평 선 */}
              {!isTop && (
                <Line
                  x1={padding}
                  y1={y}
                  x2={graphWidth - padding}
                  y2={y}
                  stroke={isBottom ? "#A1A1A1" : "#E5E5E5"}
                  strokeWidth="1"
                  strokeDasharray={isBottom ? undefined : "4,4"}
                />
              )}
            </Fragment>
          );
        })}

        {/* Y축 */}
        <Line
          x1={padding}
          y1={padding}
          x2={padding}
          y2={graphHeight - padding}
          stroke="#A1A1A1"
          strokeWidth="1"
        />

        {/* 노란색 면 */}
        <Path d={yellowFillPath} fill="url(#yellowGradient)" stroke="none" />

        {/* 노란색 선 */}
        <Path
          d={yellowPath}
          fill="none"
          stroke="#FFF085"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* 보라색 면 */}
        <Path d={purpleFillPath} fill="url(#gradient)" stroke="none" />

        {/* 보라색 선 (맨 위) */}
        <Path
          d={purplePath}
          fill="none"
          stroke="#C4B4FF"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* 예상 가임기 */}
        {fertileIndexes.map((index) => {
          const point = purplePoints[index];
          return (
            <Circle
              key={`fertile-${index}`}
              cx={point.x - 3}
              cy={point.y + 7}
              r={7}
              fill="#A684FF"
              stroke="white"
              strokeWidth={3}
            />
          );
        })}

        {/* 예상 배란일 점 */}
        <Circle
          cx={purplePoints[ovulationIndex].x - 3}
          cy={purplePoints[ovulationIndex].y - 5}
          r={7}
          fill="#7008E7"
          stroke="white"
          strokeWidth={3}
        />

        {/* X축 라벨 */}
        {xDates.map((label, i) => {
          const x = padding + i * xTickSpacing;
          return (
            <SvgText
              key={`x-${i}`}
              x={x + 3}
              y={graphHeight - padding + 20}
              fontSize="11"
              fill="#A1A1A1"
              textAnchor="middle"
            >
              {label}
            </SvgText>
          );
        })}
      </Svg>

      <View className="flex-row justify-between gap-2">
        <View className="flex-row items-center gap-1">
          <View className="px-2 py-0.5 bg-violet-300 rounded-full" />
          <Text className="text-neutral-600 text-xs">나의 패턴</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <View className="px-2 py-0.5 bg-yellow-200 rounded-full" />
          <Text className="text-neutral-600 text-xs">유사 패턴</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <View className="p-1 border-2 border-white bg-violet-400 rounded-full shadow shadow-neutral-400" />
          <Text className="text-neutral-600 text-xs">예상 가임기</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <View className="p-1 border-2 border-white bg-violet-700 rounded-full shadow shadow-neutral-400" />
          <Text className="text-neutral-600 text-xs">예상 배란일</Text>
        </View>
      </View>
    </View>
  );
}
