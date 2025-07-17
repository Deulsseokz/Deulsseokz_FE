import { Location } from '@/types/location';
import { Dimensions, StyleSheet, View } from 'react-native';
import LocationItem from './LocationSelectorItem';

interface LocationSelectorProps {
  onPress: (area: string) => void; // 특정 지역 선택시 동작
  locationList: Location[]; // 지역 배열
  selected: string | null; // 현재 선택된 지역명
}

/**
 * @returns 지역 셀렉터를 이루는 컴포넌트
 */
export default function LocationSelector({ onPress, locationList, selected }: LocationSelectorProps) {
  const { width } = Dimensions.get('window');

  // 동적인 아이템 너비 결정
  const CONTAINER_PADDING_HORIZONTAL = 20;
  const NUM_COLUMNS = 4;
  const ITEM_WIDTH = (width - CONTAINER_PADDING_HORIZONTAL * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

  return (
    <View style={{ ...style.container, paddingHorizontal: CONTAINER_PADDING_HORIZONTAL / 2 }}>
      {locationList.map((item, index) => (
        <LocationItem
          key={index}
          location={item}
          isSelected={item.area === selected}
          onPress={onPress}
          width={ITEM_WIDTH}
        />
      ))}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 0,
    paddingVertical: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
