// src/api/challenge.ts
/**
 * @file challenge.ts
 * @module api/challenge
 * @description 챌린지 API 호출/타입/매핑 유틸. 공통 요청 유틸(getRequest)을 사용합니다.
 * @see {@link api/common} 공통 요청 함수/타입
 */

import { CommonResponse, getRequest } from "./common";
import { ChallengeInfoItem, ChallengeListItem } from "./type";

/* =========================
 * API 함수
 * ========================= */

/**
 * @function fetchChallengeList
 * @description 유저의 모든 챌린지 목록을 가져옵니다.
 * @returns {Promise<ChallengeListItem[]>}
 */
export async function fetchChallengeList(): Promise<CommonResponse<ChallengeListItem[]>> {
    return await getRequest<ChallengeListItem[]>('/challenge/list/');
};

/**
 * @function fetchChallengeInfo
 * @description 특정 챌린지의 상세 정보를 서버 타입으로 가져옵니다.
 * @param {number} challengeId - 챌린지 구분 id (서버 쿼리: placeId)
 * @returns {Promise<ChallengeInfoItem>}
 *
 * @remarks
 * - 앱에서 `ChallengeInformation`이 필요하면 `composeChallengeInformation`로
 *   서버 응답 + 외부 컨텍스트(challengeId, place, isChallenged)를 합성하세요.
 */
export const fetchChallengeInfo = (
  challengeId: number
): Promise<CommonResponse<ChallengeInfoItem[]>> => {
  return getRequest<ChallengeInfoItem[]>('/challenge/info/', {
    params: { placeId: challengeId },
  });
};