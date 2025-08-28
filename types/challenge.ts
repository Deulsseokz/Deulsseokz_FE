export interface Coord {
  latitude: number;
  longitude: number;
}

// 클라이언트 챌린지 정보 타입
export type ChallengeInformation = {
  challengeId: number;
  placeName: string; // 장소명
  content: string; // 챌린지명
  point: number; // 포인트
  condition1: string; // 조건 1
  condition2: string; // 조건 2
  condition3?: string | null; // 조건 3 (선택적 데이터)
  isFavorite: boolean; // 관심 장소 등록 여부
  isChallenged: boolean; // 챌린지 수행 여부
};

// 클라이언트 챌린지 위치 타입
export type ChallengeLocation = {
  // 챌린지 아이디
  challengeId: number;
  // 랜드마크 명칭
  placeName: string;
  // 위도/경도 배열을 사용하여 구한 중심 (위도,경도) 좌표
  center: Coord;
  // polygon을 그리기 위한 위도/경도 배열
  location: Coord[];
  // 챌린지 도전 여부
  isChallenged: boolean;
  // 이미 성공한 챌린지일 경우 이미지 제공
  challengePhoto?: string;
  // 챌린지 성공시 부여받는 포인트
  point: number;
};
