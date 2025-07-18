/**
 * 지역 제목과 지역의 챌린지 장소를 받아 Clickable한 요소로 리턴한다.
 * @returns 하나의 지역에 대한 리스트 골격
 */
import { Location } from '@/types/location';
import { FlatList, StyleSheet, View } from 'react-native';
import LocationListItem from './LocationListItem';

interface Props {
  locationList: Location[];
  selectedArea: string | null; // null이면 전체
}

export default function LocationList({ locationList, selectedArea }: Props) {
  // 선택된 지역이 있다면 해당 지역의 랜드마크 리스트만 보여ㅜ줌
  const filtered = selectedArea ? locationList.filter(loc => loc.area === selectedArea) : locationList;

  return (
    <FlatList
      data={filtered}
      keyExtractor={item => item.area.toString()}
      renderItem={({ item, index }) => <LocationListItem success={false} title={item.area} listItems={item.places} />}
      ItemSeparatorComponent={() => (
        <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(230, 230, 230, 0.61)' }} />
      )}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
  item: {
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  status: {
    marginTop: 4,
    color: '#666',
  },
});
