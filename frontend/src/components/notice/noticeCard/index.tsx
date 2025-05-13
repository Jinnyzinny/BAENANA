import { ChevronDown, ChevronUp, SquarePen, Trash2 } from "lucide-react-native";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export function NoticeCard({ id, title }: { id: number; title: string }) {
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // 임시 데이터
  const data = {
    id: 1,
    title: "시스템 공지 제목",
    content: "시스템 공지 내용",
  };

  const [editTitle, setEditTitle] = useState<string>(data.title);
  const [editContent, setEditContent] = useState<string>(data.content);

  function handleEdit() {
    setIsEdit(true);
    setIsToggleOpen(true);
  }

  function handleCancel() {
    setEditTitle(data.title);
    setEditContent(data.content);
    setIsEdit(false);
  }

  function handleDelete() {}
  return (
    <View className="flex-1 bg-white p-3 gap-3 rounded-xl">
      {/* 헤더 */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          {isEdit ? (
            <TextInput
              value={editTitle}
              onChangeText={setEditTitle}
              placeholder="제목을 입력해주세요"
              className="text-neutral-800 font-bold p-0"
              style={{
                paddingVertical: 0,
                includeFontPadding: false,
                textAlignVertical: "center",
                fontSize: 14,
                lineHeight: 20,
              }}
            />
          ) : (
            <Text className="text-neutral-800 font-bold">{title}</Text>
          )}
          {/* 상태 확인 후 관리자인 경우 노출 예정 */}
          <View className="flex-row items-center gap-1">
            <TouchableOpacity onPress={handleEdit}>
              <SquarePen color="#A1A1A1" size={15} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <Trash2 color="#A1A1A1" size={15} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 토글 버튼 */}
        {isToggleOpen ? (
          <TouchableOpacity onPress={() => setIsToggleOpen(false)}>
            <ChevronUp color="#A1A1A1" size={18} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsToggleOpen(true)}>
            <ChevronDown color="#A1A1A1" size={18} />
          </TouchableOpacity>
        )}
      </View>

      {/* 본문 */}
      {isToggleOpen && (
        <View>
          {isEdit ? (
            <>
              <TextInput
                value={editContent}
                onChangeText={setEditContent}
                placeholder="내용을 입력해주세요"
                multiline
                className="text-neutral-800 text-sm p-0"
                style={{
                  paddingVertical: 0,
                  includeFontPadding: false,
                  textAlignVertical: "top",
                  fontSize: 12,
                  lineHeight: 18,
                }}
              />
              {/* 취소 / 저장 버튼 추가 필요 */}
            </>
          ) : (
            <Text className="text-neutral-800 text-sm">{data.content}</Text>
          )}
        </View>
      )}
    </View>
  );
}
