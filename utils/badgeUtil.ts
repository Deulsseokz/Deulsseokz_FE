import { Badge, BadgeMeta, RepresentativeInfo, UserBadge } from "@/types/badge";

/** 서버에서 보내준 유저 배지 리스트를 배지 카탈로그와 매핑하여 완전한 배지 객체를 반환하는 유틸 함수
 * @param catalog: 프론트에서 저장하는 뱃지 카탈로그
 * @param serverRows: 서버에서 전달된 유저 배지 리스트와 획득 일자
 * @returns Badge[] : Badge 타입의 완전한 배지 타입 리스트
 */
export function mapServerToBadges(
  catalog: BadgeMeta[],
  serverRows: UserBadge[] = [],
): Badge[] {
  const byId = new Map(catalog.map(c => [String(c.badgeId), c])); // ← badgeId로 키맵
  return serverRows.reduce<Badge[]>((acc, row) => {
    const meta = byId.get(String(row.badgeId));
    if (!meta) {
      console.warn('[badge] unknown badgeId from server:', row.badgeId);
      return acc;
    }
    acc.push({ ...meta, earnedAt: row.earnedAt });
    return acc;
  }, []);
}

/**
 * Representative 속성을 추가하여 반환하는 유틸 함수
 * @param badges 완전한 뱃지 목록
 * @param rep 대표 배지의 id
 * @returns isRepresentative 속성을 추가한 Badge 객체 배열 반환
 */
export function mergeRepresentative(
  badges: Badge[],
  rep: RepresentativeInfo | string | undefined,
) {
  const repId = typeof rep === 'string' ? rep : rep?.representativeId;
  const idStr = repId != null ? String(repId) : undefined;
  return badges.map(b => ({ ...b, isRepresentative: b.badgeId === idStr })); // ← badgeId 비교
}