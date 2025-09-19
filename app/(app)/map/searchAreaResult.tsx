import { fetchRecommendPlaces } from "@/api/challengeDTO";
import MapSearchResultTemplate from '@/components/template/map/MapSearchResultTemplate';
import { useState } from "react";

/**
 *
 * @returns 지역 검색 이후 결과 화면
 */
export default function SearchAreaResult() {
  const [recommendPlaces, setRecommendPlaces] = useState<string[]>([]);

  const fetchPlaceRecommend = async () => {
    try {
      const response = await fetchRecommendPlaces();
      if (response.isSuccess) {
        setRecommendPlaces(response.result);
      } 
    } catch (error){
      console.error('Error fetching data:', error);
    }
  }

  return <MapSearchResultTemplate fetchPlaceRecommend={fetchPlaceRecommend} recommendPlaces={recommendPlaces} />;
}
