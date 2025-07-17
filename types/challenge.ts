export interface Coord {
  latitude: number;
  longitude: number;
}

// 챌린지 정보 타입
// place로 요청
export type ChallengeInformation = {
  place: string; // 장소명
  content: string; // 챌린지명
  point: number; // 포인트
  condition1: string; // 조건 1
  condition2: string; // 조건 2
  condition3: string; // 조건 3
  isFavorite: boolean; // 관심 장소 등록 여부
};

// 챌린지 위치 타입
export type ChallengeLocation = {
  challengeId: number; // 챌린지 아이디
  place: string; // 장소명
  isChallenged: boolean; // 챌린지 참여 여부
  location: [number, number][]; // 위치(위도 경도 배열)
  challengePhoto?: string; // (선택)챌린지 사진
};
