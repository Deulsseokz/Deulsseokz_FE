import IcnClose from '@/assets/icons/icon-close-black.svg';
import { TopBar } from '@/components/common/TopBar';
import LocationListItem from '@/components/map/location/LocationListItem';
import { MCOLORS } from '@/constants/Colors';
import { Location } from '@/types/location';
import { router, useLocalSearchParams } from 'expo-router';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 검색 결과를 반환하는 스크린
// 1) 검색 결과 있음 -> 해당 지역에 대한 LocationListItem을 반환
// 2) 검색 결과 없음 -> 추천 검색어로 채운 LocationListItem 반환

export default function MapSearchResultTemplate() {
  const { input, success, result } = useLocalSearchParams();

  const parsedResult = result ? (JSON.parse(result as string) as Location) : undefined;
  const isSuccess = success === 'true';

  if (parsedResult == undefined) {
    Alert.alert('검색 실패 오류');
    return;
  } else
    return (
      <SafeAreaView style={style.container}>
        <TopBar title="" rightButton={<IcnClose />} onRightPress={() => router.navigate('/')} />
        {isSuccess ? (
          // 성공: 검색 결과
          <LocationListItem success={isSuccess} title={parsedResult.area} listItems={parsedResult.places} />
        ) : (
          // 실패: 추천 검색어
          <View style={style.contentContainer}>
            <Text style={style.failText}>'{input}'에 대한 검색 결과가 없습니다</Text>
            <LocationListItem success={isSuccess} title={'추천 검색어'} listItems={parsedResult.places} />
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
