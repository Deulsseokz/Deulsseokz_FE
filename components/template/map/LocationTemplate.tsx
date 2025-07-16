import LocationHeader from '@/components/map/LocationHeader';
import LocationList from '@/components/map/LocationList';
import LocationSelector from '@/components/map/LocationSelector';
import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 지역 선택 화면을 이루는 기본 골격
export default function LocationTemplate() {
  return (
    <SafeAreaView style={style.container}>
      <LocationHeader title="지역" onClose={() => router.back()} onSearch={() => router.push('/test')} />
      <LocationSelector />
      <LocationList />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
});
