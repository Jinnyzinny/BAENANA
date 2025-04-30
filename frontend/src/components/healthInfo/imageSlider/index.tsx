import { Dimensions, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const width: number = Dimensions.get("window").width - 40;
const images: string[] = [
  "https://i.namu.wiki/i/Mj0aArUbJiq5_c500MqmbYyDPWnSiDBCsxbesdkR0XTOtDvwrjj2ponJvctbYgQ7zPE_LvjsJHAl786rZu0tkw.webp",
  "https://i.namu.wiki/i/hdTS75xdf41WNvVbtt0h8vFOTX9Hl0L13IXtLcOJmG8NQ9usDA57kfiw3bI5m8I4nhUfphgGqwmRHcmcczHilQ.webp",
  "https://i.namu.wiki/i/kzMFcl3KBAAY-owhXpMK2GJ4yxLDV-uQMiJzk3T1ELNo9AVIDGbmQ2CVcmUBSzfNi3T6CSFRpDmDrft7P7pxoA.webp",
  "https://i.namu.wiki/i/az1sS-u8qfAUbAAP71eJqA_gE0SZa4tHRZzk7wJKwizHJ3y47KqBvt1JDpV7eXYfPVcKux940w_oJQNSRG-4rA.webp",
];

export function ImageSlider() {
  return (
    <Carousel
      width={width}
      height={200}
      autoPlay
      data={images}
      scrollAnimationDuration={2500}
      renderItem={({ item }) => (
        <Image source={{ uri: item }} className="w-full h-[200px] rounded-xl" />
      )}
    />
  );
}
