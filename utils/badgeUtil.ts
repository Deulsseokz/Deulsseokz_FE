import { ServerBadgeType } from "@/api/type";
import { Badge } from "@/types/badge";

/** 서버에서 보내준 유저 배지 리스트를 배지 카탈로그와 매핑하여 완전한 배지 객체를 반환하는 유틸 함수
 * @param catalog: 프론트에서 저장하는 뱃지 카탈로그
 * @param serverRows: 서버에서 전달된 유저 배지 리스트와 획득 일자
 * @returns Badge[] : Badge 타입의 완전한 배지 타입 리스트
 */
export function mapServerToBadges(
  catalog: Badge[], // 전체 배지 카탈로그
  serverBadges: ServerBadgeType[]
): any[] {
  return serverBadges.map(badge => {
    const found = catalog.find(cb => cb.badgeId == badge.badgeId);
    if (found)
      return {
      ...found,
      earnedAt: badge.createdAt,
      isRepresentative: badge.isRepresent,
    };
  });
}

/**
 * Representative 속성을 추가하여 반환하는 유틸 함수
 * @param badges 완전한 뱃지 목록
 * @param rep 대표 배지의 id
 * @returns isRepresentative 속성을 추가한 Badge 객체 배열 반환
 */
export function mergeRepresentative(
  badges: Badge[],
  rep: string | null,
) {
  const repId = typeof rep === 'string' ? rep : null;
  const idStr = repId != null ? String(repId) : undefined;
  return badges.map(b => ({ ...b, isRepresentative: b.badgeId === idStr })); // ← badgeId 비교
}