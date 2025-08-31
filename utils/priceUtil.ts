// 가격 표시 유틸 (₩, 소수점 제거)
export const formatKRW = (v: number) =>
  new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    maximumFractionDigits: 0,
  }).format(v);