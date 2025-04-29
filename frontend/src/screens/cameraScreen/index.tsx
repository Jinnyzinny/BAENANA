import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { PhotoFile } from "react-native-vision-camera";
import { CameraView } from "../../components/camera/cameraView";
import { PermissionCheck } from "../../components/common/permissionCheck";
import { useCameraPermission } from "../../hooks/useCameraPermission";

export function CameraScreen() {
  const hasPermission = useCameraPermission();
  const [photo, setPhoto] = useState<PhotoFile | null>(null);

  async function handlePhotoTaken(newPhoto: PhotoFile) {
    setPhoto(newPhoto);
  }

  if (hasPermission === null) {
    return <PermissionCheck name="카메라" />;
  }

  return (
    <View className="flex-1">
      {photo ? (
        <View className="flex-1">
          {/* 뒤로 가기 버튼 */}
          <TouchableOpacity
            onPress={() => {
              setPhoto(null);
            }}
            className="absolute top-5 left-5 z-10"
          >
            <ChevronLeft color="white" size={40} />
          </TouchableOpacity>

          <Image
            source={{ uri: "file://" + photo.path }}
            className="flex-1 resize-contain"
          />
        </View>
      ) : (
        <CameraView onPhotoTaken={handlePhotoTaken} />
      )}
    </View>
  );
}
