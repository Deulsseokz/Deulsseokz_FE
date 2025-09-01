import { ChallengeInformation, ChallengeLocation } from '@/types/challenge';

import { ChallengeInfoItem, ChallengeListItem } from "@/api/type";
import { Coord } from "@mj-studio/react-native-naver-map";

// raw 챌린지 데이터를 형식에 맞게 변환하는 유틸 함수
// 맵에 필요한 Coord 데이터 형식에 맞게 서버 Coord 데이터를 변환
export function convertRawChallengeData(raw: ChallengeListItem): ChallengeLocation {
  const clientCenter = {
    latitude: raw.center.lat,
    longitude: raw.center.lng,
  } as Coord;

  return {
    ...raw,
    center: clientCenter,
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