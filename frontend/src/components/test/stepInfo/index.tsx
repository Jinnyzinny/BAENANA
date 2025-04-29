import { Text, View } from "react-native";

export function StepInfo({
  title,
  contents,
  alert,
}: {
  title: string;
  contents: (string | { first: string; middle: string; last: string })[];
  alert?: string;
}) {
  return (
    <View className="items-center gap-2">
      <Text className="text-lg text-neutral-800 font-bold">{title}</Text>
      <View className="items-center">
        {contents.map((content, index) =>
          typeof content === "string" ? (
            <Text key={index} className="text-sm text-neutral-600">
              {content}
            </Text>
          ) : (
            <View key={index} className="flex-row flex-wrap justify-center">
              <Text className="text-sm text-neutral-600">{content.first}</Text>
              <Text className="text-sm text-neutral-600 font-bold">
                {content.middle}
              </Text>
              <Text className="text-sm text-neutral-600">{content.last}</Text>
            </View>
          )
        )}
        {alert && <Text className="text-sm text-violet-400">{alert}</Text>}
      </View>
    </View>
  );
}
