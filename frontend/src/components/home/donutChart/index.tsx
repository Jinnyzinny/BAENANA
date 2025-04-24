import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

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
  const pointColor: string = "#A684FF";

  return (
    <View className="relative m-5 items-center">
      <View className="absolute items-center top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 gap-1">
        <Text className="text-neutral-600 text-sm">월경 예정일</Text>
        <Text className="text-violet-700 font-bold text-xl">{dDay}일 전</Text>
      </View>
      <Svg height="200" width="200">
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
          cx="50"
          cy="100"
          r={radius}
          stroke={pointColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          rotation="-90"
          origin="75,75"
        />
      </Svg>
    </View>
  );
}
