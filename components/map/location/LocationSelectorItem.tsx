import { MCOLORS } from '@/constants/colors';
import { Location } from '@/types/location';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface LocationSelectorItemProps {
  onPress: (area: string) => void;
  location: Location;
  isSelected: boolean;
  width: number; // 기기별 동적으로 결정되는 아이템의 너비
}

/**
 *
 * @param onPress: 지역이 눌렸을 때 핸들러
 * @param location: 지역명과 지역에 따른 랜드마크
 * @param isSelected: 해당 지역이 눌렸는지 여부
 * @param width: 동적 아이템 너비
 * @returns
 */
export default function LocationSelectorItem({ onPress, location, isSelected, width }: LocationSelectorItemProps) {
  const textColor = isSelected ? MCOLORS.brand.secondary : MCOLORS.grayscale.gray30;

  return (
    <TouchableOpacity onPress={() => onPress(location.area)} style={{ ...style.item, width: width }}>
      <Text style={{ ...style.text, color: textColor }}>{location.area}</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  item: {
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
  },
});
