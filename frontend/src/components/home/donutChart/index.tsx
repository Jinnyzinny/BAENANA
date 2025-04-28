import { Text, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import { ChartTag } from "../chartTag";

export function DonutChart({
  percentage,
  dDay,
}: {
  percentage: number;
  dDay: number;
}) {
  const radius: number = 80;
  const strokeWidth: number = 25;
  const circumference: number = 2 * Math.PI * radius;
  const strokeDashoffset: number =
    circumference - (circumference * percentage) / 100;
  const backgroundColor: string = "#EEEEEE";

  return (
    <View className="relative m-5 items-center">
      {/* 월경예정일 정보 */}
      <View className="absolute items-center top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 gap-1">
        <Text className="text-neutral-600 text-sm">월경 예정일</Text>
        <Text className="text-violet-700 font-bold text-xl">{dDay}일 전</Text>
      </View>

      {/* 고정 태그 */}
      <View className="absolute -top-7 left-1/2 -translate-x-1/2">
        <ChartTag fill={false} content="시작" />
      </View>
      <View className="absolute -right-7 top-1/3 translate-x-1/2">
        <ChartTag fill={true} content="월경 끝" />
      </View>
      <View className="absolute -right-7 bottom-1/3 translate-x-1/2">
        <ChartTag fill={false} content="가임기" />
      </View>
      <View className="absolute -bottom-7 left-1/2 -translate-x-1/2">
        <ChartTag fill={true} content="배란일" />
      </View>
      <View className="absolute -left-7 top-1/2 -translate-y-1/2 -translate-x-1/2">
        <ChartTag fill={false} content="PMS" />
      </View>

      <Svg height="200" width="200">
        {/* 그라데이션 정의 */}
        <Defs>
          <LinearGradient id="grad" x1="0.7" y1="0" x2="0" y2="1.1">
            <Stop offset="0%" stopColor="#FFF7B4" stopOpacity="1" />
            <Stop offset="100%" stopColor="#A684FF" stopOpacity="1" />
          </LinearGradient>
        </Defs>

        {/* 배경 */}
        <Circle
          cx="100"
          cy="100"
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* 진행률 */}
        <Circle
          cx="100"
          cy="100"
          r={radius}
          stroke="url(#grad)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          rotation="-90"
          origin="100,100"
        />
      </Svg>
    </View>
  );
}
