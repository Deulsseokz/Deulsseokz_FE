// 전역 챌린지 정보 배열에서
// 특정 챌린지를 찾아
// center Coord를 찾은 후,
// 지도 화면에서 해당 위치로 이동하는 함수

import { useChallengeListStore } from '@/store/useChallengeListStore';
import { router } from 'expo-router';

export default function navigateToCenterCoord(place: string) {
  const challengeLocations = useChallengeListStore.getState().data;
  const locationData = challengeLocations?.find(item => item.place === place);
  if (!locationData) return;

  const centerCoord = {
    latitude: locationData.center.latitude,
    longitude: locationData.center.longitude,
  };

  router.replace({
    pathname: '/',
    params: {
      latitude: centerCoord.latitude,
      longitude: centerCoord.longitude,
    },
  });
}
