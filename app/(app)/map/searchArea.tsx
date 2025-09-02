import { getPlaceSearchArea } from "@/api/place";
import MapSearchAreaTemplate from '@/components/template/map/MapSearchAreaTemplate';
import { router } from "expo-router";

/**
 *
 * @returns 지역을 검색할 수 있는 화면
 */
export default function SearchArea() {
  const handleSearch = async (input: string) => {
    const response = await getPlaceSearchArea(input);

      router.push({
        pathname: '/map/searchAreaResult',
        params: {
          input: input,
          success: response.isSuccess ? 'true' : 'false', // 문자열을 전달
          result: JSON.stringify({
            // 직렬화하여 전달
            area: input,
            places: response.result.place,
          }),
        },
      });
  };

  return <MapSearchAreaTemplate onSearchBtn={handleSearch} />;
}
