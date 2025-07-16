import { BadgeType, FrameType } from "@/types/shareType";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PolaroidProps } from "./_type";
import { badgeImageMap, frameImageMap } from "./_utli";

interface CustomPolaroidProps {
  /** 폴라로이드에 표시할 사진 정보 */
  photo: PolaroidProps["photo"];
  /** 선택된 프레임 타입 */
  frame: FrameType;
  /** 선택된 뱃지 타입 */
  badge?: BadgeType | null;
}

/**
 * 폴라로이드 사진에 프레임을 입힐 수 있는 커스텀 폴라로이드 컴포넌트
 * - FrameType에 따라 오버레이 적용함
 */
export default function CustomPolaroid({
  photo,
  frame,
  badge,
}: PolaroidProps & CustomPolaroidProps) {
  const { image, additional, date } = photo;

  return (
    <View
      style={[
        styles.polaroid,
        frame === FrameType.BLACK ? styles.blackFrame : styles.whiteFrame,
      ]}
    >
      <Image source={image} style={styles.image} />

      {frameImageMap[frame] && (
        <Image source={frameImageMap[frame]} style={styles.overlay} />
      )}

      {badge && badgeImageMap[badge] && (
        <Image source={badgeImageMap[badge]} style={styles.badge} />
      )}

      <View>
        <Text style={styles.emoji}>
          {additional.feeling} {additional.weather}
        </Text>
        <Text style={styles.desc} numberOfLines={2}>
          {additional.desc}
        </Text>
      </View>

      <Text style={styles.date}>{date}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  polaroid: {
    width: 145,
    paddingTop: 30,
    paddingRight: 9,
    paddingBottom: 10,
    paddingLeft: 9,

    backgroundColor: "#fff",
    flexDirection: "column",

    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 1.35 },
    elevation: 5,
  },
  blackFrame: {
    backgroundColor: "#000",
    color: "#E9E9E9",
  },
  whiteFrame: {
    backgroundColor: "#fff",
    color: "#4A4A4A",
  },
  image: {
    width: 127,
    height: 158,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 145,
    height: "100%",
    resizeMode: "contain",
  },
  badge: {
    position: "absolute",
    top: -10,
    left: -40,
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  emoji: {
    fontSize: 10,
    paddingTop: 7,
    paddingBottom: 7,
  },
  desc: {
    fontSize: 7,
    lineHeight: 10,
    minHeight: 54,
  },
  date: {
    fontSize: 8,
    color: "#ACACAC",
    paddingTop: 4,
  },
});
