/**
 *
 * @returns 하나의 지역에 대한 랜드마크를 touchable하게 list형태로 반환
 */

import { MCOLORS } from '@/constants/Colors';
import { Location } from '@/types/location';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ListItemInterface {
  location: Location;
  onPress: (item: Location) => void;
}

export default function LocationListItem({ location, onPress }: ListItemInterface) {
  return (
    <View style={style.container}>
      <Text style={style.title}>{location.area}</Text>
      <View style={style.itemContainer}>
        {location.places.map(item => (
          <TouchableOpacity key={item}>
            <Text style={{ ...style.item }}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 0,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  title: {
    color: MCOLORS.grayscale.gray70,
    fontFamily: 'Pretendard-Bold',
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 24,
  },
  itemContainer: {
    padding: 15,
    gap: 25,
  },
  item: {
    color: MCOLORS.grayscale.gray80,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
  },
});
