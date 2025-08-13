import { BadgeMeta } from "@/types/badge";
import { BadgeType } from "@/types/shareType";

// 프론트에 상수로 보관하는 배지 카탈로그
export const BADGE_CATALOG: BadgeMeta[] = [
  {
    badgeId: '1',
    name: BadgeType.FIRST,
    condition: '첫 로그인 완료',
    description: '서비스에 처음 로그인하면 획득합니다.',
  },
  {
    badgeId: '2',
    name: BadgeType.GENGHI,
    condition: '10곳 이상 방문',
    description: '10개 이상의 챌린지 달성시 획득합니다.',
  },
  {
    badgeId: '3',
    name: BadgeType.HANYANG,
    condition: '5개의 궁에서 챌린지를 달성',
    description: '5개의 궁에서 챌린지를 달성하면 획득합니다.',
  },
  {
    badgeId: '4',
    name: BadgeType.OZI,
    condition: '오지 탐험을 함',
    description: '잘 알려지지 않은 소도시나 시골 마을 3곳 이상을 방문했을 때 획득합니다.',
  },
];

