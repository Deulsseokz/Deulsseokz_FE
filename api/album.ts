/** @file api/album.ts
 * @module api/album
 * @description 앨범 관련 API 요청 함수들을 정의합니다.
 * @see {@link api/common} 공통 요청 함수
 * @see {@link api/type} API 응답에 사용되는 타입들
 */

/**************************************************************/

import { CommonResponse, getRequest, patchRequest, postRequest } from './common';
import { AlbumItem, PhotoAddRequest, PhotoFixRequest, PhotoItem } from './type';

/**
 * @function getAlbumList
 * @description 앨범 목록 조회
 * @returns {Promise<CommonResponse<AlbumItem[]>>} 앨범 목록 배열을 포함한 응답
 */
export async function getAlbumList(): Promise<CommonResponse<AlbumItem[]>> {
  return await getRequest<AlbumItem[]>('/album/');
}

/**
 * @function getAlbumByPlace
 * @description 특정 장소의 앨범 상세 조회 (해당 장소의 사진 목록)
 * @param {string} place - 조회할 장소 이름
 * @returns {Promise<CommonResponse<PhotoItem[]>>} API 응답 메시지
 */
export async function getAlbumByPlace(place: string): Promise<CommonResponse<PhotoItem[]>> {
  return await getRequest<PhotoItem[]>(`/album/photos?place=${encodeURIComponent(place)}`);
}

/**
 * @function postPhotoToAlbum
 * @description 앨범에 사진 또는 사진/설명을 추가하는 API 호출
 * @param {PhotoAddRequest} body - 사진 및 설명 정보
 * @param {string} token - Bearer 액세스 토큰 (opt)
 * @returns {Promise<CommonResponse<string>>} API 응답 메시지
 */
export async function postPhotoToAlbum(body: PhotoAddRequest, token?: string): Promise<CommonResponse<string>> {
  return await postRequest<string, PhotoAddRequest>('/album/url', body, token);
}

/**
 * @function patchPhotoToAlbum
 * @description 앨범에 설명을 수정하는 API 호출
 * @param {PhotoAddRequest} body - 사진 및 설명 정보
 * @param {string} token - Bearer 액세스 토큰 (opt)
 * @returns {Promise<CommonResponse<string>>} API 응답 메시지
 */
export async function patchPhotoToAlbum(body: PhotoFixRequest, token: string | null): Promise<CommonResponse<string>> {
  return await patchRequest<string, PhotoFixRequest>('/photo/', body, token);
}
