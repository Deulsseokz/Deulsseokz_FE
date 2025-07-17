import { ChallengeLocation } from '@/types/challenge';

import { getPolygonCenter, toCoordArray } from './geo';

// 전달 받는 raw 챌린지 데이터
export type RawChallengeLocation = Omit<ChallengeLocation, 'center' | 'location'> & { location: number[][] };

// raw 챌린지 데이터를 형식에 맞게 변환하는 훅
// 1. center 좌표 추가
// 2. Coord 타입에 맞게 location 데이터를 변환
export function convertRawChallengeData(raw: RawChallengeLocation): ChallengeLocation {
  const coords = toCoordArray(raw.location);
  const center = getPolygonCenter(coords);
  return {
    ...raw,
    location: coords,
    center: center,
  };
}
