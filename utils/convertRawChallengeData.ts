import { ChallengeInformation, ChallengeLocation } from '@/types/challenge';

import { ChallengeInfoItem, ChallengeListItem } from "@/api/type";
import { getPolygonCenter, toCoordArray } from './geo';

// raw 챌린지 데이터를 형식에 맞게 변환하는 유틸 함수
// 1. center 좌표 추가
// 2. Coord 타입에 맞게 location 데이터를 변환
export function convertRawChallengeData(raw: ChallengeListItem): ChallengeLocation {
  const coords = toCoordArray(raw.location);
  const center = getPolygonCenter(coords);
  return {
    ...raw,
    location: coords,
    center: center,
  };
}

/**
 * @description raw 챌린지 info 데이터를 형식에 맞게 변환 및 필요한 속성 (challengeId, isChallenged) 추가
 * @param rawData : ChallengeInfoItem 서버 타입 데이터
 * @param challengeId : 연결된 챌린지 id
 * @param isChallenged : 챌린지 달성 여부
 * @returns ChallengeInformation 타입
 */
export function convertRawChallengeInfo(rawData: ChallengeInfoItem, challengeId: number, isChallenged: boolean) : ChallengeInformation{
   // 괄호 제거
    const stripBracket = (text?: string | null) => (text ? text.replace(/^\[[^\]]+\]\s*/, '') : '');

   const parsedData : ChallengeInformation = {
      ...rawData,
      condition1: stripBracket(rawData.condition1),
      condition2: stripBracket(rawData.condition2),
      condition3: stripBracket(rawData.condition3),
      challengeId: challengeId,
      isChallenged: isChallenged,
   }
   
   return parsedData;
}