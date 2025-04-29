import { Pause, Play, TimerReset, X } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";

export function TimerModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const totalTime = 10 * 60; // 10분
  const [timeLeft, setTimeLeft] = useState<number>(totalTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      setIsRunning(false); // 시간 다 되면 멈춤
    }
  }, [timeLeft, isRunning]);

  const handlePlayPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false); // 진행 중인 시간 멈춤
    setTimeLeft(totalTime); // 시간 초기화(10분)
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const radius = 60;
  const strokeWidth = 15;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - timeLeft / totalTime);

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-[90%] max-h-[70%] p-5 bg-white rounded-xl gap-5">
            {/* 상단 헤더 */}
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-1">
                <Image
                  source={require("../../../assets/images/mascot.png")}
                  className="w-10 h-10"
                />
                <Text className="text-neutral-800 text-md font-bold">
                  타이머
                </Text>
              </View>
              <TouchableOpacity onPress={onClose}>
                <X />
              </TouchableOpacity>
            </View>

            {/* 도넛 그래프*/}
            <View className="items-center justify-center">
              {timeLeft ? (
                <>
                  <Svg
                    width={radius * 2 + strokeWidth}
                    height={radius * 2 + strokeWidth}
                  >
                    <Defs>
                      <LinearGradient
                        id="gradient"
                        x1="0.7"
                        y1="0"
                        x2="0"
                        y2="1.1"
                      >
                        <Stop offset="0%" stopColor="#FFF7B4" />
                        <Stop offset="100%" stopColor="#A684FF" />
                      </LinearGradient>
                    </Defs>
                    <Circle
                      cx={radius + strokeWidth / 2}
                      cy={radius + strokeWidth / 2}
                      r={radius}
                      stroke="#EEEEEE"
                      strokeWidth={strokeWidth}
                      fill="none"
                    />
                    <Circle
                      cx={radius + strokeWidth / 2}
                      cy={radius + strokeWidth / 2}
                      r={radius}
                      stroke="url(#gradient)"
                      strokeWidth={strokeWidth}
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="none"
                      rotation="-90"
                      origin={`${radius + strokeWidth / 2}, ${radius + strokeWidth / 2}`}
                    />
                  </Svg>

                  <View className="absolute items-center justify-center">
                    <Text className="text-2xl font-bold text-violet-400">
                      {formattedTime}
                    </Text>
                  </View>
                </>
              ) : (
                <View className="items-center justify-center gap-3">
                  <Text className="text-2xl font-bold text-violet-700">
                    측정 완료
                  </Text>
                  <View>
                    <View className="items-center gap-1">
                      <Text className="text-neutral-600">
                        결과 확인을 위해 창을 닫고,
                      </Text>
                      <View className="flex-row">
                        <Text className="text-violet-400 font-bold">
                          [촬영하러 가기]
                        </Text>
                        <Text className="text-neutral-600">를 눌러주세요.</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              {/* 버튼 영역 */}
            </View>
            <View className="p-3 gap-5 flex-row justify-center items-center">
              <TouchableOpacity onPress={handlePlayPause}>
                {isRunning ? (
                  <Pause color="#525252" size={25} fill="#525252" />
                ) : (
                  <Play color="#525252" size={25} fill="#525252" />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={handleReset}>
                <TimerReset color="#525252" size={24} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
