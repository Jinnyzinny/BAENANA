import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const { height, width } = Dimensions.get("window");

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  content: string;
  imageUrl?: string;
}

export function BottomSheet({
  visible,
  onClose,
  title,
  content,
  imageUrl,
}: BottomSheetProps) {
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      // 바텀시트가 아래에서 위로 슬라이드 업 효과
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // 바텀시트가 위에서 아래로 슬라이드 다운 효과
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backgroundOverlay} />
        </TouchableWithoutFeedback>
        
        <Animated.View
          style={[
            styles.bottomSheetContainer,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* 상단 핸들 영역 */}
          <View style={styles.handle} />

          {/* 컨텐츠 영역 */}
          <ScrollView 
            style={styles.contentContainer}
            contentContainerStyle={styles.scrollContentContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>{title}</Text>

            {imageUrl && (
              <Image
                source={{ uri: imageUrl }}
                style={styles.image}
                resizeMode="cover"
              />
            )}

            <Text style={styles.content}>{content}</Text>
            
            {/* 여백 공간 추가 */}
            <View style={{height: 20}} />
          </ScrollView>

          {/* 닫기 버튼 */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  backgroundOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomSheetContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: "100%",
    height: "90%",
    // 노치 디자인 기기를 위해 하단 패딩 값 지정
    paddingBottom: 34,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
  },
  scrollContentContainer: {
    flexGrow: 1, 
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333333",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333333",
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#f26b83",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10, // 하단 버튼에 마진 추가
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
