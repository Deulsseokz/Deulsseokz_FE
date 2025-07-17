// 전역 챌린지 정보 배열에서
// 특정 챌린지를 찾아
// center Coord를 찾은 후,
// 지도 화면에서 해당 위치로 이동하는 함수

import { router } from 'expo-router';

export default function navigateToCenterCoord(place: string) {
  // TODO: 실제 전역 데이터에 접근하는 과정 필요.
  const centerCoord = {
    latitude: 37.58341408,
    longitude: 126.99026382,
  };
  router.replace({
    pathname: '/',
    params: {
      latitude: centerCoord.latitude,
      longitude: centerCoord.longitude,
    },
  });
}
