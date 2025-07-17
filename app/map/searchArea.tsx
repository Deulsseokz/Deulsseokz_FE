import { fetchSearchArea } from '@/api/fetchSearchArea';
import MapSearchAreaTemplate from '@/components/template/map/MapSearchAreaTemplate';
import { router } from 'expo-router';
import { Alert } from 'react-native';

export default function SearchArea() {
  // 검색 버튼이 눌렸을 때 핸들러
  // params를 구성하여 result 화면으로 연결
  const handleSearch = async (input: string) => {
    const response = await fetchSearchArea(input);

    if (!response || response.error) {
      Alert.alert('검색 실패');
      return;
    } else {
      router.push({
        pathname: '/map/searchAreaResult',
        params: {
          input: input,
          success: response.success ? 'true' : 'false', // 문자열을 전달
          result: JSON.stringify({
            // 직렬화하여 전달
            area: input,
            places: response.data,
          }),
        },
      });
    }
  };

  return <MapSearchAreaTemplate onSearchBtn={handleSearch} />;
}
