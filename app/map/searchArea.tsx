import { fetchSearchArea } from '@/api/fetchSearchArea';
import MapSearchAreaTemplate from '@/components/template/map/MapSearchAreaTemplate';
import { router } from 'expo-router';
import { Alert } from 'react-native';

/**
 *
 * @returns 지역을 검색할 수 있는 화면
 */
export default function SearchArea() {
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
