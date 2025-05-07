import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import { PermissionAlert } from "../utils/permissionAlert";

function isAuthorized(status: string): boolean {
  return status === RESULTS.GRANTED;
}

// 저장소 권한 확인
export function useStoragePermission() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    async function getPermissionStatus() {
      // ios인 경우 불필요한 권한
      if (Platform.OS !== "android") {
        setHasPermission(true);
        return;
      }

      // Android 10(SDK 29 이상)인 경우 불필요한 권한
      if (Platform.Version > 28) {
        setHasPermission(true);
        return;
      }

      const permission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;

      // 현재 저장소 권한 확인
      const currentStatus = await check(permission);
      console.log("[저장소 권한] 현재:", currentStatus);

      // 이미 권한이 부여된 경우 권한 있음으로 상태 변경
      if (isAuthorized(currentStatus)) {
        setHasPermission(true);
        return;
      }

      // 권한이 없는 경우 권한 요청
      const requestedStatus = await request(permission);
      console.log("[저장소 권한] 요청 후:", requestedStatus);

      // 권한이 거부된 상태인 경우 권한 부여 메시지 노출
      if (requestedStatus === RESULTS.BLOCKED) {
        console.log("[저장소 권한] BLOCKED");
        PermissionAlert("저장소");
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
