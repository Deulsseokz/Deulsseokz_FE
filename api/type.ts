/** @file api/type.ts
 * @module api/type
 * @description API 응답에 사용되는 타입들을 정의합니다.
 * @see {@link api/common} 공통 응답 타입
 */

/**************************************************************/

/**
 * @typedef AlbumItem
 * @description 앨범 목록에서 사용되는 대표 항목 정보
 * @property {number} id - 앨범 고유 ID
 * @property {string} place - 장소 이름 (앨범의 구분 기준)
 * @property {string} representPhoto - 대표 사진 URL
 */
export interface AlbumItem {
  id: number;
  place: string;
  representPhoto: string[];
}

/**
 * @typedef PhotoItem
 * @description 특정 장소의 앨범 상세 사진 항목 정보
 * @property {number} id - 사진 고유 ID
 * @property {string} url - 사진 URL
 * @property {string | null} feelings - 선택된 기분 (이모지 형태)
 * @property {string | null} weather - 선택된 날씨 (이모지 형태)
 * @property {string | null} photoContent - 사진에 대한 텍스트 설명
 * @property {string | null} date - 사진의 날짜 정보 (YYYY-MM-DD)
 * @property {boolean} isFavorite - 대표 사진 여부
 */
export interface PhotoItem {
  id: number
  url: string;
  feelings: string | null;
  weather: string | null;
  photoContent: string | null;
  date: string | null;
  isFavorite: boolean;
}

/**
 * @typedef PhotoAddRequest
 * @description 새로운 사진을 앨범에 추가할 때 사용하는 요청 형식
 * @property {string | null} photo - 외부 사진 URL
 * @property {string} place - 장소명
 * @property {string} [feelings] - 기분 이모지 (opt)
 * @property {string} [weather] - 날씨 이모지 (opt)
 * @property {string} [photoContent] - 사진에 대한 설명 텍스트 (opt)
 * @property {string} [date] - 사진 촬영일 (YYYY-MM-DD, opt)
 */
export interface PhotoAddRequest {
  photo: string | null;
  place: string;
  feelings?: string;
  weather?: string;
  photoContent?: string;
  date?: string;
}

