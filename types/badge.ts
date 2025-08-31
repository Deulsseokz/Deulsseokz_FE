import { BadgeType } from "./shareType";

// 전체 배지 정보를 저장하기 위한 "정적" 카탈로그(프론트 상수)
export type BadgeMeta = {
  /** 배지 아이디(프론트 카탈로그 키) — 문자열로 통일 */
  badgeId: string;
  /** 배지 이름(타입) — UI 라벨로도 사용 가능 */
  name: BadgeType;
  /** 배지 달성 조건(프론트 저장) */
  condition: string;
  /** 배지 설명(프론트 저장) */
  description: string;
};

/** 화면에서 쓰는 최종 배지(정적 + 동적) */
export type Badge = BadgeMeta & {
  earnedAt?: string;
  isRepresentative?: boolean;
};