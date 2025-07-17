import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LocationHeader from '@/components/map/location/LocationHeader';
import LocationList from '@/components/map/location/LocationList';
import LocationSelector from '@/components/map/location/LocationSelector';
import { useState } from 'react';

import { LOCATION_DATA } from '@/constants/map/locationData';
import { Location } from '@/types/location';

interface LocationTemplateProps {
  // onPressPlace: 특정 장소를 클릭했을 때의 클릭 핸들러
  onPressPlace: (place: string) => void;
  // Location 타입의 지역 데이터
  locationList: Location[];
}

// 지역 선택 화면을 이루는 기본 골격
export default function LocationTemplate({ onPressPlace, locationList }: LocationTemplateProps) {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  return (
    <SafeAreaView style={style.container}>
      <LocationHeader title="지역" onClose={() => router.back()} onSearch={() => router.push('/map/searchArea')} />
      <LocationSelector onPress={setSelectedArea} locationList={LOCATION_DATA} selected={selectedArea} />
      <LocationList locationList={LOCATION_DATA} selectedArea={selectedArea} />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 49,
    paddingHorizontal: 31,
    justifyContent: 'flex-start',
    gap: 31,
    backgroundColor: '#fff',
  },
});
