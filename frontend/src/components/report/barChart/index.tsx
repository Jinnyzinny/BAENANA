import { Text, View } from "react-native";

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
          <View
            className="h-5 rounded-full bg-violet-400"
            style={{
              width: `${percentage}%`,
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
