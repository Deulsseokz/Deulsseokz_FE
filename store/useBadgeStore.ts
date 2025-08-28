import * as badgeApi from '@/api/badge';
import { BADGE_CATALOG } from '@/constants/badgesCatalog';
import { Badge } from '@/types/badge';
import { mapServerToBadges, mergeRepresentative } from '@/utils/badgeUtil';
import { create } from 'zustand';

/** ---------- Zustand Store ---------- */
/** 상태 타입 정의 */ 
type State = {
  badges: Badge[];             // 완전한 유저 배지 목록
  representativeId: string;   // 대표 배지 id
  loading: boolean;
  setting: boolean;
  error?: string | null;
};

type Actions = {
  /** 초기 배지 정보 저장 */
  init: (badgeId:string) => Promise<void>;               
  /** 배지 정보 업데이트 */  
  refresh: (badgeId:string) => Promise<void>;              
  /** 대표 배지 저장 */
  setRepresentative: (badgeId: string) => Promise<void>; 
  clearError: () => void;
  reset: () => void;
};

type Store = State & Actions;

/** 배지 관련 상태 관리 */
export const useBadge = create<Store>((set, get) => ({
  badges: [],
  representativeId: '',
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

  init: async (repBadgeId: string) => {
    set({ loading: true, error: null });
    try {
      /* 서버에서 유저 배지 목록을 받아와서 카탈로그와 매핑 후 상태에 저장 */
      const {result} = await badgeApi.getUserBadgeList();
      const merged = mapServerToBadges(BADGE_CATALOG, result);
      const withRep = mergeRepresentative(merged, repBadgeId);
      set({
        badges: withRep,
        representativeId: String(repBadgeId),
        loading: false,
      });
    } catch (e: any) {
      set({ error: e?.message ?? '알 수 없는 오류', loading: false });
    }
  },

refresh: async (repBadgeId:string) => {
  set({ loading: true, error: null });
  try {
    /* 서버에서 유저 배지 목록을 받아와서 카탈로그와 매핑 후 상태에 저장 */
      const {result} = await badgeApi.getUserBadgeList();
      const merged = mapServerToBadges(BADGE_CATALOG, result);
      const withRep = mergeRepresentative(merged, repBadgeId);
      set({
        badges: withRep,
        representativeId: repBadgeId,
        loading: false,
      });
  } catch (e: any) {
    set({ error: e?.message ?? '알 수 없는 오류', loading: false });
  }
},

  setRepresentative: async (newBadgeId: string) => {
    const { badges, representativeId } = get();
    if (representativeId === newBadgeId) return;

    // 낙관적 업데이트
    const prev = badges;
    const next = mergeRepresentative(badges, newBadgeId);
    set({ badges: next, representativeId: String(newBadgeId), setting: true, error: null });

    try {
      if (newBadgeId) await badgeApi.patchRepresentBadge(newBadgeId);
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
