import { Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export function BarChart({
  startDate,
  endDate,
  period,
  maxPeriod,
}: {
  startDate: string;
  endDate: string;
  period: number;
  maxPeriod: number;
}) {
  const percentage = Math.min((period / maxPeriod) * 100, 100);

  return (
    <View className="gap-2">
      <Text className="text-neutral-600 text-xs">
        {startDate} ~ {endDate}
      </Text>
      <View className="flex-row items-center gap-2">
        <View className="flex-1 h-5 relative bg-[#EEEEEE] rounded-full overflow-hidden">
          <LinearGradient
            colors={["#A684FF", "#C4B4FF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: `${percentage}%`,
              height: "100%",
              borderRadius: 999,
            }}
          />
        </View>
        <Text className="text-violet-700 text-sm font-semibold">
          {period}일
        </Text>
      </View>
    </View>
  );
}
