import { FrameType } from "@/types/shareType";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import PriceTag from "../common/PriceTag";
import { frameIcons } from "./_utli";

interface OptionSelectionElProps {
  /** 옵션 레이블 */
  label: string;
  /** 선택 가능한 프레임 타입 */
  frameType: FrameType;
  /** 현재 선택된 프레임 타입 여부 */
  selected: boolean;
  /** 가격이 있는 경우 표시할 가격 */
  price?: number;
  /** 프레임 타입을 선택했을 때 호출되는 콜백 */
  onPress: (type: FrameType) => void;
}

/**
 * 프레임 옵션 선택 컴포넌트
 * - 선택된 프레임 타입에 따라 아이콘이 변경됨
 * - 가격이 있는 경우 가격 표시
 */
export default function OptionSelectionEl({
  label,
  frameType,
  selected,
  price,
  onPress,
}: OptionSelectionElProps) {
  const imageSource = selected
    ? frameIcons[frameType].active
    : frameIcons[frameType].inactive;

  return (
    <View style={styles.optionContainer}>
      <Pressable onPress={() => onPress(frameType)}>
        <Image source={imageSource} style={styles.icon} />
      </Pressable>
      <Text style={styles.label}>{label}</Text>
      {price !== undefined && <PriceTag price={price} />}
    </View>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    alignItems: "center",
    gap: 4,
  },
  icon: {
    width: 60,
    height: 60,
  },
  label: {
    fontSize: 12,
    color: "#333",
  },
  priceWrapper: {
    marginTop: 3,
    backgroundColor: "#F8F8F8",
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 3,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  coin: {
    width: 15,
    height: 15,
  },
  price: {
    fontSize: 12,
    color: "#FF6B9A",
    fontWeight: "600",
  },
});
