import fontStyles from '@/constants/fonts';
import { BadgeType, FrameType } from '@/types/shareType';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import PriceTag from '../common/PriceTag';
import { badgeIcons, frameIcons } from './_utli';

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
  const isFrame = frameType !== undefined;
  const isBadge = badgeType !== undefined;

  const imageSource = isFrame
    ? selected
      ? frameIcons[frameType!].active
      : frameIcons[frameType!].inactive
    : isBadge
    ? selected
      ? badgeIcons[badgeType!].active
      : badgeIcons[badgeType!].inactive
    : undefined;

  const handlePress = () => {
    if (isFrame) onPress(frameType!);
    else if (isBadge) onPress(badgeType!);
  };

  const iconStyle = isFrame ? styles.frameIcon : styles.badgeIcon;

  return (
    <View style={styles.optionContainer}>
      <Pressable onPress={handlePress} disabled={!imageSource}>
        {imageSource ? (
          <Image source={imageSource} style={iconStyle} />
        ) : (
          <View style={[iconStyle, styles.iconPlaceholder]} />
        )}
      </Pressable>
      <Text style={styles.label}>{label}</Text>
      {price !== undefined && <PriceTag price={price} />}
    </View>
  );
}

const styles = StyleSheet.create({
  optionContainer: {
    alignItems: 'center',
    minHeight: 150,
    gap: 7,
  },
  frameIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  badgeIcon: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
  },
  iconPlaceholder: {
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
  },
  label: {
    paddingTop: 3,
    ...fontStyles.medium13,
    color: '#333',
  },
});
