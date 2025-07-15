import { BadgeType, FrameType } from "@/types/shareType";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import PriceTag from "../common/PriceTag";
import { badgeIcons, frameIcons } from "./_utli";

interface OptionSelectionElProps {
  /** 옵션 레이블 */
  label: string;
  /** 선택 가능한 프레임 타입 (opt) */
  frameType?: FrameType;
  /** 선택 가능한 뱃지 타입 (opt) */
  badgeType?: BadgeType;
  /** 현재 선택 상태 여부 */
  selected: boolean;
  /** 가격이 있는 경우 표시할 가격 (opt)*/
  price?: number; 
  /** 옵션을 선택했을 때 호출되는 콜백 */
  onPress: (type: FrameType | BadgeType) => void;
}

/**
 * 옵션 선택 컴포넌트 (프레임 또는 뱃지)
 * - 선택된 타입에 따라 프레임/뱃지가 변경됨
 * - 가격이 있는 경우 가격 표시
 */
export default function OptionSelectionEl({
  label,
  frameType,
  badgeType,
  selected,
  price,
  onPress,
}: OptionSelectionElProps) {

  const imageSource =
    frameType !== undefined
      ? selected
        ? frameIcons[frameType].active
        : frameIcons[frameType].inactive
      : badgeType !== undefined
      ? selected
        ? badgeIcons[badgeType].active
        : badgeIcons[badgeType].inactive
      : undefined;

  const handlePress = () => {
    if (frameType !== undefined) onPress(frameType);
    else if (badgeType !== undefined) onPress(badgeType);
  };

  return (
    <View style={styles.optionContainer}>
      <Pressable onPress={handlePress}>
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
    minHeight: 120,
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
});
