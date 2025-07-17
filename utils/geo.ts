import { Coord } from '@/types/challenge';

/**
 * [number, number]로 구성된 위/경도 정보를 Coord 객체로 변환하는 유틸 함수입니다.
 * @param: number[][]
 * @returns: Coord[]
 */
export function toCoordArray(location: number[][]): Coord[] {
  return location.map(([lat, lng]) => ({
    latitude: lat,
    longitude: lng,
  }));
}

/**
 * 주어진 위도/경도 좌표들의 중심 좌표를 계산하여 반환하는 유틸함수입니다
 * @param Coord[] 형태의 폴리곤 좌표 배열
 * @returns 중심 좌표: {latitude: number; longitude: number}
 */
export function getPolygonCenter(coords: Coord[]): Coord {
  let totalLat = 0;
  let totalLng = 0;

  coords.forEach(({ latitude, longitude }) => {
    totalLat += latitude;
    totalLng += longitude;
  });

  return {
    latitude: totalLat / coords.length,
    longitude: totalLng / coords.length,
  } as Coord;
}
