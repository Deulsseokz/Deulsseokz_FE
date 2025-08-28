// useProfileStore.ts
import { getMyPageInfo, patchMyPageInfo } from '@/api/mypage';
import { MyPageFixRequest } from "@/api/type";
import { create } from 'zustand';

export type MyPage = { userName: string; profileImage: string | null }

type State = {
  data: MyPage
  loading: boolean
  saving: boolean
  error?: string
  lastFetchedAt?: number
}

type Actions = {
  /** 프로필 정보 불러오기 (ttlMs 지정 시 해당 시간 내 재호출 스킵) */
  fetchMyPageInfo: (opts?: { ttlMs?: number }) => Promise<{ profile: MyPage | null; badgeId: string | null }>
  /** 이름/이미지 공용 업데이트*/
  updateProfile: (partial: { userName?: string | null; profileImage?: string | null }) => Promise<void>
  /** 에러 상태 초기화 */
  clear: () => void
}

export type ProfileStore = State & Actions

export const useProfileStore = create<ProfileStore>((set, get) => ({
  data: { userName: '', profileImage: null },
  loading: false,
  saving: false,
  error: undefined,
  lastFetchedAt: undefined,

  fetchMyPageInfo: async ({ ttlMs = 0 } = {}) => {
    const now = Date.now()
    const { lastFetchedAt, loading, data } = get();
    if (loading) return { profile: data, badgeId: null }
    if (ttlMs && lastFetchedAt && now - lastFetchedAt < ttlMs) {
      return { profile: data, badgeId: null }
    }

    set({ loading: true, error: undefined })
    try {
      const { result } = await getMyPageInfo()
      const next: MyPage = {
        userName: result.userName,
        profileImage: result.profileImage ?? null,
      }
      set({ data: next, loading: false, lastFetchedAt: now })
      return { profile: next, badgeId: result.badgeId ?? null }
    } catch (e: any) {
      set({ loading: false, error: e?.message ?? '마이페이지 불러오기 실패' })
      return { profile: get().data, badgeId: null }
    }
  },

  updateProfile: async (partial) => {
    const { data: prev, saving } = get();
    if (!prev || saving) return;

    const payload: MyPageFixRequest = {userName: null, profileImage: null}
    if (partial.userName !== null && partial.userName) payload.userName = partial.userName
    if (partial.profileImage !== undefined) payload.profileImage = partial.profileImage
    if (Object.keys(payload).length === 0) return;

    // 낙관적 업데이트
    const optimistic: MyPage = {
      ...prev,
      ...(payload.userName !== null ? { userName: payload.userName } : {}),
      ...(payload.profileImage !== null ? { profileImage: payload.profileImage } : {}),
    }
    set({ data: optimistic, saving: true, error: undefined })

    try {
      await patchMyPageInfo(payload)
      await get().fetchMyPageInfo({ ttlMs: 0 })
    } catch (e: any) {
      // 실패 시 롤백
      set({ data: prev, error: e?.message ?? '프로필 저장 실패' })
    } finally {
      set({ saving: false })
    }
  },

  clear: () =>
    set({ data:{ userName: '', profileImage: null }, error: undefined, lastFetchedAt: undefined, loading: false, saving: false }),
}))
