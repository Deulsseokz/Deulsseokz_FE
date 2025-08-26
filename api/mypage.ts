/** @file api/mypage.ts
 * @module api/mypage
 * @description 마이페이지 관련 API 요청 함수들을 정의합니다.
 * @see {@link api/common} 공통 요청 함수
 * @see {@link api/type} UserBadge : 서버가 주는 뱃지 타입
 */

/**************************************************************/
import { CommonResponse, getRequest, patchRequest } from "./common";
import { MyPageFixRequest, MyPageItem } from "./type";

/**
 * @function getMyPageInfo
 * @description 유저의 마이페이지 정보 조회
 * @returns {Promise<CommonResponse<MyPageItem>>} 마이페이지 정보를 포함한 응답
 */
export async function getMyPageInfo() : Promise<CommonResponse<MyPageItem>> {
    return await getRequest<MyPageItem>("/mypage/info");
}

/**
 * @function patchMyPageInfo
 * @description 유저의 마이페이지 정보 수정
 * @param {MyPageFixRequest} body - 수정할 프로필 이미지 혹은 사용자 이름
 * @param {string} token
 * @returns {Promise<CommonResponse<string>>} - API 응답 메시지
 */
export async function patchMyPageInfo(
    body: MyPageFixRequest,
) : Promise<CommonResponse<string>> {
    return await patchRequest<string, MyPageFixRequest>(`/mypage/info`, body);
}