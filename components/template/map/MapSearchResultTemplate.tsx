import IcnClose from '@/assets/icons/icon-close-black.svg';
import { TopBar } from '@/components/common/TopBar';
import LocationListItem from '@/components/map/location/LocationListItem';
import { MCOLORS } from '@/constants/Colors';
import { Location } from '@/types/location';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 검색 결과를 반환하는 스크린
// 1) 검색 결과 있음 -> 해당 지역에 대한 LocationListItem을 반환
// 2) 검색 결과 없음 -> 추천 검색어로 채운 LocationListItem 반환

interface MapSearchResultTemplateProps {
  // 성공/실패 관련 없이 입력된 input 값
  input: string;
  // 검색 성공/실패 구분
  success: boolean;
  // 검색 성공시 Location 객체 전달 (검색 결과 혹은 추천 검색어)
  result: Location;
  // 추천 검색어를 눌렀을 때 검색어를 전달하는 버튼
  onSearchBtn: (input: string) => Location;
}

export default function MapSearchResultTemplate({ input, success, result, onSearchBtn }: MapSearchResultTemplateProps) {
  return (
    <SafeAreaView style={style.container}>
      <TopBar title="" rightButton={<IcnClose />} onRightPress={() => router.navigate('/')} />
      {success && result ? (
        // 성공: 검색 결과
        <LocationListItem success={success} title={result.area} listItems={result.places} onPress={onSearchBtn} />
      ) : (
        // 실패: 추천 검색어
        <View style={style.contentContainer}>
          <Text style={style.failText}>'{input}'에 대한 검색 결과가 없습니다</Text>
          <LocationListItem success={success} title={'추천 검색어'} listItems={result.places} onPress={onSearchBtn} />
        </View>
      )}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MCOLORS.grayscale.gray0,
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  failText: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: MCOLORS.grayscale.gray30,
  },
});
