// 개별 옵션 타입
export type PurchaseOption = {
  points: number;
  priceKRW: number;
};

// 실제 상수(리터럴 고정 + 읽기 전용)
export const PURCHASE_OPTIONS = [
  { points: 1000,  priceKRW: 10000 },
  { points: 3000,  priceKRW: 20000 },
  { points: 5000,  priceKRW: 40000 },
  { points: 10000, priceKRW: 80000 },
] as const;

// 리터럴 타입
export type PurchaseOptionLiteral = typeof PURCHASE_OPTIONS[number];

// 포인트→옵션 빠른 접근용 맵(선택 사항)
export const PURCHASE_OPTION_BY_POINTS = {
  1000: PURCHASE_OPTIONS[0],
  3000: PURCHASE_OPTIONS[1],
  5000: PURCHASE_OPTIONS[2],
  10000: PURCHASE_OPTIONS[3],
} as const;