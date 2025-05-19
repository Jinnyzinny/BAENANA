import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef } from "react";
import { Image, ScrollView, Text, ToastAndroid, View } from "react-native";
import RNFS from "react-native-fs";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import { SafeAreaView } from "react-native-safe-area-context";
import ViewShot, { captureRef } from "react-native-view-shot";
import {
  useGetChildbearingAge,
  useGetPredictedPeriod,
} from "../../api/quries/period";
import {
  useGetOvulationTest,
  useGetPeriodAlert,
  useGetPeriodInfo,
  useGetRecentMedicine,
  useGetRecentPeriod,
  useGetReport,
} from "../../api/quries/report";
import { AlertMessage } from "../../components/common/alertMessage";
import { CustomButton } from "../../components/common/customButton";
import { HeaderLogo } from "../../components/common/headerLogo";
import { PermissionCheck } from "../../components/common/permissionCheck";
import { BeforePeriod } from "../../components/report/beforePeriod";
import { MedicineInfo } from "../../components/report/medicineInfo";
import { OvulationInfo } from "../../components/report/ovulationInfo";
import { RecentPeriod } from "../../components/report/recentPeriod";
import { Summary } from "../../components/report/summary";
import { useStoragePermission } from "../../hooks/useStoragePermission";

export function ReportScreen() {
  const hasPermission = useStoragePermission();
  const firstViewRef = useRef(null);
  const secondViewRef = useRef(null);
  const thirdViewRef = useRef(null);

  // 화면 캡처 후 PDF 생성
  async function handleCaptureToPdf() {
    try {
      // 1. 화면 캡처
      const firstImageUri = await captureRef(firstViewRef, {
        format: "jpg",
        quality: 1.0,
      });
      const secondImageUri = await captureRef(secondViewRef, {
        format: "jpg",
        quality: 1.0,
      });
      const thirdImageUri = await captureRef(thirdViewRef, {
        format: "jpg",
        quality: 1.0,
      });

      console.log("첫 번째 이미지 uri: ", firstImageUri);
      console.log("두 번째 이미지 uri: ", secondImageUri);
      console.log("세 번째 이미지 uri: ", thirdImageUri);

      // 2. base64로 변환
      const firstBase64Data = await RNFS.readFile(firstImageUri, "base64");
      const secondBase64Data = await RNFS.readFile(secondImageUri, "base64");
      const thirdBase64Data = await RNFS.readFile(thirdImageUri, "base64");

      console.log("첫 번째 base64: ", firstBase64Data);
      console.log("두 번째 base64: ", secondBase64Data);
      console.log("세 번째 base64: ", thirdBase64Data);

      // 3. 현재 시간 파일명에 추가
      const now = new Date();
      const timestamp = `${now.getFullYear()}${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}_${now
        .getHours()
        .toString()
        .padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}${now
        .getSeconds()
        .toString()
        .padStart(2, "0")}`;

      const fileName = `screenshot_pdf_${timestamp}`;

      // 4. HTML 생성 (base64 이미지 삽입)
      const html = `
        <html>
          <head>
            <style>
              @page {
                size: 1080px 2340px;
                margin: 0;
              }
              body {
                margin: 0;
                padding: 0;
              }
              .page {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100vh; /* 전체 화면 기준 수직 정렬 */
              }
              img {
                max-width: 100%;
                height: auto;
                display: block;
              }
            </style>
          </head>
          <body>
            <div class="page">
              <h1>${timestamp}</h1>
              <hr/>
              <img src="data:image/jpg;base64,${firstBase64Data}" />
            </div>
            <div class="page">
              <h1>${timestamp}</h1>
              <img src="data:image/jpg;base64,${secondBase64Data}" />
            </div>
            <div class="page">
              <h1>${timestamp}</h1>
              <img src="data:image/jpg;base64,${thirdBase64Data}" />
            </div>
          </body>
        </html>
        `;

      // 5. pdf로 변환 및 저장
      const pdf = await RNHTMLtoPDF.convert({
        html,
        fileName,
        directory: "Downloads",
        base64: false,
      });
      console.log("PDF 저장 경로:", pdf.filePath);

      // 6. 사용자의 Downloads 폴더에 저장
      const generatedPath = pdf.filePath; // html-to-pdf로 생성된 경로
      const finalPath = `${RNFS.DownloadDirectoryPath}/${fileName}.pdf`;

      await RNFS.copyFile(generatedPath, finalPath);
      console.log("실제 다운로드 폴더 경로:", finalPath);

      // 7. 저장 완료 알림
      ToastAndroid.show(
        "PDF가 Downloads 폴더에 저장되었습니다.",
        ToastAndroid.SHORT
      );
    } catch (error) {
      console.error("PDF 생성 중 오류 발생: ", error);
    }
  }

  const { data: periodAlertData, refetch: refetchPeriodAlert } =
    useGetPeriodAlert();

  const { data: periodInfoData, refetch: refetchPeriodInfo } =
    useGetPeriodInfo();

  const { data: recentPeriodData, refetch: refetchRecentPeriod } =
    useGetRecentPeriod();

  const { data: ovulationTestData, refetch: refetchOvulationTest } =
    useGetOvulationTest();

  const { data: recentMedicineData, refetch: refetchRecentMedicine } =
    useGetRecentMedicine();

  const { data: reportData, refetch: refetchReport } = useGetReport();

  const { data: childbearingAgeData, refetch: refetchChildbearingAge } =
    useGetChildbearingAge();
  const { data: predictedPeriodData, refetch: refetchPredictedPeriod } =
    useGetPredictedPeriod();

  useFocusEffect(
    useCallback(() => {
      refetchPeriodAlert();
      refetchPeriodInfo();
      refetchRecentPeriod();
      refetchOvulationTest();
      refetchRecentMedicine();
      refetchReport();
      refetchChildbearingAge();
      refetchPredictedPeriod();
    }, [])
  );

  if (hasPermission === null) {
    return <PermissionCheck name="저장소" />;
  }

  return (
    <SafeAreaView>
      <HeaderLogo before={false} settings={true} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}>
        <View className="gap-3 mx-5 pb-16">
          {/* 알림 메시지 */}
          {periodAlertData?.data && periodAlertData?.data.message && (
            <AlertMessage
              type={periodAlertData.data.menstrual_is_normal ? "good" : "warn"}
              title="최근 월경 주기"
              content={periodAlertData.data.message}
            />
          )}

          {/* 첫 번째 캡처 */}
          <ViewShot
            ref={firstViewRef}
            options={{ format: "jpg", quality: 1.0 }}
          >
            <View className="gap-3">
              {/* 월경 주기 / 월경 기간 */}
              {periodInfoData?.data && (
                <View className="flex-row gap-3">
                  <BeforePeriod
                    type="warn"
                    title="월경 주기"
                    date={
                      periodInfoData?.data.cycle
                        ? periodInfoData?.data.cycle
                        : 0
                    }
                  />
                  <BeforePeriod
                    type="normal"
                    title="월경 기간"
                    date={
                      periodInfoData?.data.period
                        ? periodInfoData?.data.period
                        : 0
                    }
                  />
                </View>
              )}

              {/* 배란테스트 결과 */}
              {ovulationTestData?.data &&
                childbearingAgeData?.data &&
                predictedPeriodData?.data && (
                  <OvulationInfo
                    ovulationData={ovulationTestData.data}
                    childbearingAgeData={childbearingAgeData.data}
                  />
                )}
            </View>
          </ViewShot>

          {/* 두 번째 캡처 */}
          <ViewShot
            ref={secondViewRef}
            options={{ format: "jpg", quality: 1.0 }}
          >
            {/* 최근 주기 */}
            {recentPeriodData?.data && (
              <RecentPeriod data={recentPeriodData.data} />
            )}
          </ViewShot>

          {/* 세 번째 캡처 */}
          <ViewShot
            ref={thirdViewRef}
            options={{ format: "jpg", quality: 1.0 }}
          >
            {/* 최근 복용약 */}
            {recentMedicineData?.data && (
              <MedicineInfo data={recentMedicineData.data} />
            )}
          </ViewShot>

          {/* 이번 달 월경 출혈량 / 최근 복용약 / 이번 달 월경 증상 */}
          {reportData?.data && <Summary data={reportData.data} />}
          <View />

          {/* 입력된 정보가 없는 경우 */}
          {!periodAlertData?.data?.message &&
            !periodInfoData?.data &&
            !ovulationTestData?.data &&
            !recentPeriodData?.data &&
            !recentMedicineData?.data &&
            !reportData?.data &&
            !childbearingAgeData?.data &&
            !predictedPeriodData?.data && (
              <>
                <View
                  className="flex-1 items-center gap-3"
                  style={{ marginVertical: 150 }}
                >
                  <Image
                    source={require("../..//assets/images/mascot_monocle.png")}
                    style={{ width: 100, height: 110 }}
                  />
                  <View className="items-center gap-1">
                    <Text className="text-neutral-600 text-sm mt-5">
                      배나나에 입력된 정보가 없어요.
                    </Text>
                    <View className="flex-row">
                      <Text className="text-neutral-600 text-sm">
                        월경 관련 일정을{" "}
                      </Text>
                      <Text className="text-violet-700 font-bold text-sm">
                        캘린더
                      </Text>
                      <Text className="text-neutral-600 text-sm">
                        에서 등록해주세요.
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            )}

          {/* 버튼 */}
          {(!!periodAlertData?.data?.message ||
            !!periodInfoData?.data ||
            !!ovulationTestData?.data ||
            !!recentPeriodData?.data ||
            !!recentMedicineData?.data ||
            !!reportData?.data ||
            !!childbearingAgeData?.data ||
            !!predictedPeriodData?.data) && (
            <CustomButton
              fill={true}
              content="PDF로 저장"
              onPress={handleCaptureToPdf}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
