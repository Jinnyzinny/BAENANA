import { Circle } from "lucide-react-native";
import { useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import { Camera, PhotoFile, useCameraDevice } from "react-native-vision-camera";
import { Loading } from "../../common/loading";

interface CameraViewProps {
  onPhotoTaken: (photo: PhotoFile) => void;
}

export function CameraView({ onPhotoTaken }: CameraViewProps) {
  const camera = useRef<Camera>(null);
  const device = useCameraDevice("back");

  async function takePhoto() {
    if (camera.current == null) return;
    const photo = await camera.current.takePhoto();
    onPhotoTaken(photo);
  }

  if (device == null) {
    return <Loading />;
  }

  return (
    <View className="flex-1 relative">
      <Camera
        ref={camera}
        style={{ flex: 1 }}
        device={device}
        isActive={true}
        photo={true}
      />
      <TouchableOpacity
        onPress={takePhoto}
        className="absolute bottom-7 self-center bg-white p-1 rounded-full"
      >
        <Circle color="#A1A1A1" size={60} strokeWidth={1} />
      </TouchableOpacity>
    </View>
  );
}
