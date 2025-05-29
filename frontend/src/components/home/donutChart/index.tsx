import { useEffect } from "react";
import { Text, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import { ChartTag } from "../chartTag";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from "react-native-reanimated";

// 애니메이션이 가능한 Circle로 래핑
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function DonutChart({
  percentage,
  dDay,
}: {
  percentage: number;
  dDay: number;
}) {
  const radius = 80;
  const strokeWidth = 25;
  const circumference = 2 * Math.PI * radius;
  const progress = useSharedValue(0);

  // 애니메이션 재시작
  useEffect(() => {
    progress.value = withTiming(percentage, { duration: 1200 });
  }, [percentage]);

  // AnimatedProps 정의
  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset =
      circumference - (circumference * progress.value) / 100;
    return {
      strokeDashoffset,
    };
  });

  return (
    <View className="relative m-5 items-center">
      {/* 중앙 텍스트 */}
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
          stroke="#EEEEEE"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* 진행률 */}
        <AnimatedCircle
          cx="100"
          cy="100"
          r={radius}
          stroke="url(#grad)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          fill="none"
          rotation="-90"
          origin="100,100"
        />
      </Svg>
    </View>
  );
}
