// src/api/challenge.ts
/**
 * @file challenge.ts
 * @module api/challenge
 * @description 챌린지 API 호출/타입/매핑 유틸. 공통 요청 유틸(getRequest)을 사용합니다.
 * @see {@link api/common} 공통 요청 함수/타입
 */

import { CommonResponse, getRequest } from './common';
import { ChallengeInfoItem, ChallengeListItem, ChallengeResultItem } from './type';

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
}

/**
 * @function fetchChallengeInfo
 * @description 특정 챌린지의 상세 정보를 서버 타입으로 가져옵니다.
 * @param {number} challengeId - 챌린지 구분 id (서버 쿼리: placeId)
 * @returns {Promise<ChallengeInfoItem>}
 */
export const fetchChallengeInfo = (challengeId: number): Promise<CommonResponse<ChallengeInfoItem[]>> => {
  return getRequest<ChallengeInfoItem[]>('/challenge/info/', {
    params: { placeId: challengeId },
  });
};

/**
 * @function fetchRecommendPlaces
 * @description 추천 장소 리스트를 서버 타입으로 가져옵니다.
 * @returns {Promise<string[]>} // 따로 감싸지 않고 result에 바로 string[] 배열이 옴
 */
export const fetchRecommendPlaces = (): Promise<CommonResponse<string[]>> => {
  return getRequest<string[]>('/place/recommend');
};

/**
 * @function fetchChallengeResult
 * @description 챌린지 결과를 서버 타입으로 가져옵니다.
 * @returns {Promise<ChallengeResultItem>}
 */
export const fetchChallengeResult = (id: number): Promise<CommonResponse<ChallengeResultItem>> => {
  return getRequest<ChallengeResultItem>(`/challenge/result/${id}/`);
};
