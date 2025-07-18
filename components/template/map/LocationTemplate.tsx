import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LocationHeader from '@/components/map/location/LocationHeader';
import LocationList from '@/components/map/location/LocationList';
import LocationSelector from '@/components/map/location/LocationSelector';
import { useState } from 'react';

import { Location } from '@/types/location';

interface LocationTemplateProps {
  // Location 타입의 지역 데이터
  locationList: Location[];
}

// 지역 선택 화면을 이루는 기본 골격
export default function LocationTemplate({ locationList }: LocationTemplateProps) {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  return (
    <SafeAreaView style={style.container}>
      <LocationHeader title="지역" onClose={() => router.back()} onSearch={() => router.push('/map/searchArea')} />
      <LocationSelector onPress={setSelectedArea} locationList={locationList} selected={selectedArea} />
      <LocationList locationList={locationList} selectedArea={selectedArea} />
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
