import React, { ReactNode } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";

interface NoticeItemProps {
  id: string;
  title: string;
  content: ReactNode | null;
  isExpanded: boolean;
  onToggle: (id: string) => void;
}

export function NoticeItem({ id, title, content, isExpanded, onToggle }: NoticeItemProps) {
  return (
    <View className="bg-white rounded-md overflow-hidden mb-2">
      <TouchableOpacity 
        className="px-4 py-3 flex-row justify-between items-center"
        onPress={() => onToggle(id)}
      >
        <Text className="font-medium text-neutral-800 flex-1">{title}</Text>
        {isExpanded ? (
          <ChevronUp size={20} color="#9CA3AF" />
        ) : (
          <ChevronDown size={20} color="#9CA3AF" />
        )}
      </TouchableOpacity>
      
      {isExpanded && content && (
        <View className="px-4 pb-4">
          {content}
        </View>
      )}
    </View>
  );
}
