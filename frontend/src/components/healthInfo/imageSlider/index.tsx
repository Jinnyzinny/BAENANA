import { Dimensions, Image } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const width: number = Dimensions.get("window").width - 40;
const images: string[] = [
  require("../../../assets/images/cardnews_01.png"),
  require("../../../assets/images/cardnews_02.png"),
  require("../../../assets/images/cardnews_03.png"),
  require("../../../assets/images/cardnews_04.png"),
];

export function ImageSlider() {
  return (
    <Carousel
      width={width}
      height={200}
      autoPlay
      data={images}
      scrollAnimationDuration={5000}
      renderItem={({ item }) => (
        <Image source={item} className="w-full h-[200px] rounded-xl" />
      )}
    />
  );
}
