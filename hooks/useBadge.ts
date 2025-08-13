import { BADGE_CATALOG } from '@/constants/badgesCatalog';
import { Badge, RepresentativeInfo, UserBadge } from '@/types/badge';
import { mapServerToBadges, mergeRepresentative } from '@/utils/badgeUtil';
import { create } from 'zustand';

/** ---------- 더미 서버 데이터 ---------- */
const DUMMY_SERVER_BADGES: UserBadge[] = [
  { badgeId: '1', earnedAt: '2025-07-10T09:00:00Z' },
  { badgeId: '2', earnedAt: '2025-07-15T12:30:00Z' },
  { badgeId: '3' , earnedAt: '2025-07-15T12:30:00Z' },
  { badgeId: '4' , earnedAt: '2025-07-15T12:30:00Z' },
];

/** ---------- 더미 대표 배지 ---------- */
const DUMMY_REPRESENTATIVE: RepresentativeInfo = { representativeId: '1' };

/** ---------- 주입 가능 API  ---------- */
type BadgeApi = {
  // 서버 타입 UserBadge 배열 반환 Promise 객체 받아오는 함수
  fetchUserBadges: () => Promise<UserBadge[]>;
  // 추후 마이페이지 API 연동과 합칠 예정
  fetchRepresentative: () => Promise<RepresentativeInfo>;
  // 대표 배지 변경
  setRepresentative: (badgeId: string) => Promise<void>;
};

// 기본은 더미 구현
let badgeApi: BadgeApi = {
  fetchUserBadges: async () => Promise.resolve(DUMMY_SERVER_BADGES),
  fetchRepresentative: async () => Promise.resolve(DUMMY_REPRESENTATIVE),
  setRepresentative: async () => Promise.resolve(),
};

/** 외부에서 실제 API로 교체할 때 사용 (토큰 생기면 여기서 클로저로 처리) */
export function setBadgeApi(api: Partial<BadgeApi>) {
  badgeApi = { ...badgeApi, ...api };
}

/** ---------- Zustand Store ---------- */
type State = {
  badges: Badge[];             // 완전한 유저 배지 목록
  representativeId?: string;   // 대표 배지 id
  loading: boolean;
  setting: boolean;
  error?: string | null;
};

type Actions = {
  /** 초기 배지 정보 저장 */
  init: () => Promise<void>;               
  /** 배지 정보 업데이트 */  
  refresh: () => Promise<void>;              
  /** 대표 배지 저장 */
  setRepresentative: (badgeId: string) => Promise<void>; 
  clearError: () => void;
  reset: () => void;
};

type Store = State & Actions;

export const useBadge = create<Store>((set, get) => ({
  badges: [],
  representativeId: undefined,
  loading: false,
  setting: false,
  error: null,

  clearError: () => set({ error: null }),

  reset: () =>
    set({
      badges: [],
      representativeId: undefined,
      loading: false,
      setting: false,
      error: null,
    }),

  init: async () => {
    set({ loading: true, error: null });
    try {
      const [rows, rep] = await Promise.all([
        badgeApi.fetchUserBadges(),
        badgeApi.fetchRepresentative(),
      ]);
      const merged = mapServerToBadges(BADGE_CATALOG, rows);
      const withRep = mergeRepresentative(merged, rep);
      set({
        badges: withRep,
        representativeId: rep.representativeId,
        loading: false,
      });
    } catch (e: any) {
      set({ error: e?.message ?? '알 수 없는 오류', loading: false });
    }
  },

  refresh: async () => {
    set({ loading: true, error: null });
    try {
      const [rows, rep] = await Promise.all([
        badgeApi.fetchUserBadges(),
        badgeApi.fetchRepresentative(),
      ]);
      const merged = mapServerToBadges(BADGE_CATALOG, rows);
      const withRep = mergeRepresentative(merged, rep);
      set({
        badges: withRep,
        representativeId: rep.representativeId,
        loading: false,
      });
    } catch (e: any) {
      set({ error: e?.message ?? '알 수 없는 오류', loading: false });
    }
  },

  setRepresentative: async (badgeId: string) => {
    const { badges, representativeId } = get();
    if (representativeId === badgeId) return;

    // 낙관적 업데이트
    const prev = badges;
    const next = mergeRepresentative(badges, { representativeId: badgeId } as RepresentativeInfo);
    set({ badges: next, representativeId: String(badgeId), setting: true, error: null });

    try {
      await badgeApi.setRepresentative(badgeId);
    } catch (e: any) {
      // 롤백
      set({ badges: prev, representativeId, error: e?.message ?? '대표 배지 설정 실패' });
    } finally {
      set({ setting: false });
    }
  },
}));

/** --------------- 셀렉터 ---------------- */
/** 배지 목록만 반환하는 셀렉터 */
export const useBadges = () => useBadge(s => s.badges);

/** 대표 배지 셀렉터 (Store → Badge | undefined) */
const selectRepresentativeBadge = (s: Store) => {
  const repId = s.representativeId == null ? undefined : String(s.representativeId);
  if (!repId) return undefined;
  return s.badges.find(b => String((b as any).badgeId) === repId);
};

export const useRepresentativeBadge = () =>
  // 내부적으로 위의 함수를 실행 후, 대표 뱃지 객체만 반환함.
  useBadge(selectRepresentativeBadge);

/** 로딩/에러 상태만 가져오기 */
export const useBadgeLoadingFlags = () =>
  useBadge(s => ({ loading: s.loading, setting: s.setting, error: s.error }));
