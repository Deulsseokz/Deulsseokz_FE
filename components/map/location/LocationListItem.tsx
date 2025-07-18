/**
 *
 * @returns 하나의 지역에 대한 랜드마크를 touchable하게 list형태로 반환
 */

import { MCOLORS } from '@/constants/Colors';
import navigateToCenterCoord from '@/utils/navigateToCenterCoord';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ListItemProps {
  // 성공화면인지 실패화면인지 확인
  success: boolean;
  // 리스트 제목
  title: string;
  // 리스트 아이템
  listItems: string[];
}

export default function LocationListItem({ success, title, listItems }: ListItemProps) {
  // TODO : 추천 검색어 API 연동
  const titleColor = !success ? MCOLORS.brand.secondary : MCOLORS.grayscale.gray70;
  listItems = ['한강공원', '홍대', '경복궁', '광화문', '북촌한옥마을', '해방촌'];

  return (
    <ScrollView style={style.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={{ ...style.title, color: titleColor }}>{title}</Text>
      <View style={style.itemContainer}>
        {listItems.map(item => (
          <TouchableOpacity key={item} onPress={() => navigateToCenterCoord(item)}>
            <Text style={{ ...style.item }}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  title: {
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
