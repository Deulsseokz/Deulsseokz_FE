
import { FeelingType } from "@/types/feeling";
import { WeatherType } from "@/types/weather";
import React from "react";
import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const CARD_WIDTH = 261;
const CARD_HEIGHT = 514;

interface PhotoSetCarouselProps {
  /** 폴라로이드 사진 리스트 (additional - opt) */
  photos: {
    id: string;
    image: ImageSourcePropType;
    additional?: {
      weather: WeatherType;
      feeling: FeelingType;
      desc: string;
    };
    date: string;
  }[];
  /** 현재 활성화된 인덱스 */
  activeIndex: number;
  /** 활성화된 인덱스를 설정하는 함수 */
  setActiveIndex: (index: number) => void;
}

/**
 * 사진 세트를 가로로 스크롤 가능한 캐러셀 형태로 보여주는 컴포넌트
 * - 각 사진은 폴라로이드 스타일로 표시됨
 */

export default function PhotoSetCarousel({
  photos,
  activeIndex,
  setActiveIndex,
}: PhotoSetCarouselProps) {
  return (
    <View>
      <Carousel
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        data={photos}
        scrollAnimationDuration={500}
        onSnapToItem={setActiveIndex}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.95,
          parallaxScrollingOffset: 50,
        }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.polaroid}>
              <Image source={item.image} style={styles.image} />

              <View style={styles.additional}>
                {(item.additional?.feeling || item.additional?.weather) && (
                  <Text style={styles.emoji}>
                    {item.additional?.feeling ?? ""}{" "}
                    {item.additional?.weather ?? ""}
                  </Text>
                )}
                {item.additional?.desc && (
                  <Text style={styles.desc} numberOfLines={2}>
                    {item.additional.desc}
                  </Text>
                )}
              </View>

              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
  },
  polaroid: {
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: 10,

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  emoji: {
    fontSize: 20,
    marginBottom: 5,
  },
  additional: {
    minHeight: 70,
  },
  desc: {
    fontSize: 13,
    lineHeight: 20,
    color: "#4A4A4A",
  },
  date: {
    fontSize: 12,
    color: "#ACACAC",
    paddingVertical: 20,
  },
});