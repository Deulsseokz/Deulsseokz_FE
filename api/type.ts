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

/**
 * @typedef PhotoFixRequest
 * @description 앨범 내용을 수정할 때 사용하는 요청 형식
 * @property {number} photoId - 수정할 사진의 고유 ID
 * @property {string} [feelings] - 기분 이모지 (opt)
 * @property {string} [weather] - 날씨 이모지 (opt)
 * @property {string} [photoContent] - 사진에 대한 설명 텍스트 (opt)
 * @property {string} [date] - 사진 촬영일 (YYYY-MM-DD, opt)
 */
export interface PhotoFixRequest {
  photoId: number;
  feelings?: string;
  weather?: string;
  photoContent?: string;
  date?: string;
}

/**************************************************************/

/**
 * @typedef UserBadge
 * @description 사용자가 가진 배지에 대한 정보
 * @property {string} badgeId - 뱃지 아이디
 * @property {string} earnedAt - 뱃지 취득일
 */
export interface UserBadge {
  /** 서버가 주는 사용자의 획득 배지 아이디 배열 */
  badgeId: string;
  /** 서버가 주는 취득일 */
  earnedAt?: string;
}

/**************************************************************/

/** 목록 응답 아이템 (서버 원본) */
export interface ChallengeListItem {
  challengeId: number;
  placeName: string;
  isChallenged: boolean;
  challengePhoto: string | undefined;
  location: number[][]; // [lat, lng][] 포맷
  point: number;
};

/** 상세 응답 아이템 (서버 원본) */
export interface ChallengeInfoItem {
  placeName: string;
  content: string;
  point: number;
  condition1: string;
  condition2: string;
  condition3?: string | null;
  isFavorite: boolean;
};

export type ChallengeListResponse = ChallengeListItem[];

/**************************************************************/

/**
 * @typedef MyPageItem
 * @description 마이페이지에 사용되는 마이페이지 정보
 * @property {string} userName - 사용자명
 * @property {string} profileImage - 사용자 프로필 이미지
 * @property {string} badgeId - 대표 배지 아이디
 */
export interface MyPageItem {
  userName: string;
  profileImage: string | null;
  badgeId: string;
}

/**
 * @typedef MyPageFixRequest
 * @description 마이페이지 정보 (프로필 사진, 이름) 변경시 사용하는 요청 형식
 * @property {string} userName: 사용자 이름
 * @property {string} profileImage: 사용자 프로필 이미지
 */
export interface MyPageFixRequest{
  userName: string | null;
  profileImage: string | null;
}

/**************************************************************/
/**
 * @typedef PlaceSearchArea
 * @description 특정 지역에 대한 랜드마크를 받을 때 사용하는 데이터
 * @place 장소명 배열
 */
export interface PlaceSearchArea{
  place: string[];
}

/**
 * @typedef FavoritePlace
 * @description 관심 장소에 대한 정보
 * @property {string} place - 장소 이름
 * @property {string} placeImage - 장소 대표 이미지 URL
 * @property {string} content - 장소에 대한 설명
 * @property {number[]} [friends] - 함께한 친구들의 ID 목록 (선택 사항)
 * @property {string[]} friendsProfileImage - 친구 프로필 이미지 URL 목록
 */
export interface FavoritePlace {
  place: string;
  placeImage?: string;
  content: string;
  friends?: number[] | null;
  friendsProfileImage: string[] | null;
}

/**
 * @typedef FavoritePlaceSubmitRequest
 * @description 관심 장소 등록 / 등록 취소에 사용되는 요청 형식
 * @property {string}[place] - 관심 장소로 등록하고자 하는 장소명
 * @property {boolean} [isFavorite] - 등록: true, 등록 취소: false
 */
export interface FavoritePlaceSubmitRequest {
  place: string;
  isFavorite: boolean;
}
