/** @file api/badge.ts
 * @module api/badge
 * @description 뱃지 관련 API 요청 함수들을 정의합니다.
 * @see {@link api/common} 공통 요청 함수
 * @see {@link api/type} UserBadge : 서버가 주는 뱃지 타입
 */

/**************************************************************/
import { RepresentativeInfo } from "@/types/badge";
import { CommonResponse, getRequest, patchRequest } from "./common";
import { UserBadge } from "./type";

/**
 * @function getUserBadgeList
 * @description 유저가 가진 배지 조회
 * @returns {Promise<CommonResponse<UserBadge[]>>} 유저 배지 배열을 포함한 응답
 */
export async function getUserBadgeList() : Promise<CommonResponse<UserBadge[]>> {
    return await getRequest<UserBadge[]>("/badge");
}

/**
 * @function patchRepresentBadge
 * @description 유저 대표 배지 설정
 * @param {RepresentativeInfo} body - 대표 배지 id
 * @param {string} token
 * @returns {Promise<CommonResponse<string>>} - API 응답 메시지
 */
export async function patchRepresentBadge(
    body: RepresentativeInfo,
    token?: string
) : Promise<CommonResponse<string>> {
    return await patchRequest<string, string>(`/badge/represent?badgeId=${body.representativeId}`, token);
}