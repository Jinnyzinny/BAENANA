import { useEffect } from "react";
import { Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

export function BarChart({
  startDate,
  endDate,
  cycle,
  maxPeriod,
}: {
  startDate: string;
  endDate: string;
  cycle: number;
  maxPeriod: number;
}) {
  const percentage = Math.min((cycle / maxPeriod) * 100, 100);
  const minPercentage = Math.max(percentage, 0);

  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(minPercentage, { duration: 800 });
  }, [cycle, minPercentage]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return (
    <View className="gap-2">
      <Text className="text-neutral-600 text-xs">
        {startDate} ~ {endDate}
      </Text>

      <View className="flex-row items-center justify-between">
        <View className="flex-1 h-5 bg-[#EEEEEE] rounded-full overflow-hidden mr-3">
          {/* 그라데이션 정의*/}
          <AnimatedGradient
            colors={["#A684FF", "#C4B4FF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              {
                height: "100%",
                borderRadius: 999,
              },
              animatedStyle,
            ]}
          />
        </View>

        <Text className="text-violet-700 text-sm font-semibold w-[40px] text-right">
          {cycle ? `${cycle}일` : ""}
        </Text>
      </View>
    </View>
  );
}
