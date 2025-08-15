/** @file api/place.ts
 * @module api/place
 * @description 장소 관련 API 요청 함수들을 정의합니다.
 * @see {@link api/common} 공통 요청 함수
 * @see {@link api/type}
 */

/**************************************************************/
import { CommonResponse, getRequest, postRequest } from "./common";
import { FavoritePlace, FavoritePlaceSubmitRequest, PlaceSearchArea } from "./type";

/**
 * @function getFavoritePlace
 * @description 유저의 관심 장소 조회
 * @returns {Promise<CommonResponse<FavoritePlace[]>>} 관심 장소 정보 배열
 */
export async function getFavoritePlace() : Promise<CommonResponse<FavoritePlace[]>> {
    return await getRequest<FavoritePlace[]>("/place/favorite");
}

/**
 * @function postFavoritePlace
 * @descrption 관심장소 등록 또는 취소
 * @param {FavoritePlaceSubmitRequest} body - 관심 장소 등록/취소 정보
 * @param {string} token - Bearer 액세스 토큰 (opt)
 * @returns {Promise<CommonResponse<string>>} API 응답 메시지
 */
export async function postFavoritePlace(
    body: FavoritePlaceSubmitRequest,
    token?: string
) : Promise<CommonResponse<string>> {
  return await postRequest<string, FavoritePlaceSubmitRequest>("/place/favorite", body);
}

/**
 * @function  getPlaceSearchArea
 * @description 특정 지역의 랜드마크 배열 조회
 * @param {string} place - 조회할 장소 이름
 * @returns {Promise<CommonResponse<PlaceSearchArea>>} 랜드마크명 배열
 */
export async function getPlaceSearchArea(place:string) : Promise<CommonResponse<PlaceSearchArea>> {
    return await getRequest<PlaceSearchArea>(`place/search-area/?area=${place}`);
}
