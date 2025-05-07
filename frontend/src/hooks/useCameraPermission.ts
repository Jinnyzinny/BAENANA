import { useEffect, useState } from "react";
import { Camera, CameraPermissionStatus } from "react-native-vision-camera";
import { PermissionAlert } from "../utils/permissionAlert";

function isAuthorized(status: CameraPermissionStatus): boolean {
  return status === "granted";
}

// 카메라 권한 확인
export function useCameraPermission() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    async function getPermissionStatus() {
      // 현재 카메라 권한 확인
      const currentStatus = await Camera.getCameraPermissionStatus();
      console.log("[카메라 권한] 현재:", currentStatus);

      // 이미 권한이 부여된 경우 권한 있음으로 상태 변경
      if (isAuthorized(currentStatus)) {
        setHasPermission(true);
        return;
      }

      // 권한이 없는 경우 권한 요청
      const requestedStatus = await Camera.requestCameraPermission();
      console.log("[카메라 권한] 요청 후:", requestedStatus);

      // 권한이 거부된 상태인 경우 권한 부여 메시지 노출
      if (requestedStatus === "denied") {
        console.log("[카메라 권한] BLOCKED");
        PermissionAlert("카메라");
        setHasPermission(false);
        return;
      }

      // 현재 권한 상태로 권한 상태 변경
      setHasPermission(isAuthorized(requestedStatus));
    }

    getPermissionStatus();
  }, []);

  return hasPermission;
}
