import { getPlaceSearchArea } from "@/api/placeDTO";
import MapSearchAreaTemplate from '@/components/template/map/MapSearchAreaTemplate';
import { router } from "expo-router";
import { Alert } from "react-native";

/**
 *
 * @returns 지역을 검색할 수 있는 화면
 */
export default function SearchArea() {
  const handleSearch = async (input: string) => {
    try {
      const response = await getPlaceSearchArea(input);
      if (response.isSuccess && response.result.place) {
        console.log(response.result.place.length);
        // 성공적으로 데이터를 받아온 경우
        router.push({
        pathname: '/map/searchAreaResult',
        params: {
          input: input,
          success: response.result.place.length !== 0 ? 'true' : 'false', // 문자열을 전달
          result: JSON.stringify({
            // 직렬화하여 전달
            area: input,
            places: response.result?.place,
          }),
        },
      });
    } else Alert.alert(
          "검색 실패", 
          "장소를 검색하는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요."
        );
    }
    catch (error) {
      Alert.alert(
          "검색 실패", 
          "장소를 검색하는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요."
        );
      }
    }

  return <MapSearchAreaTemplate onSearchBtn={handleSearch} />;
}
