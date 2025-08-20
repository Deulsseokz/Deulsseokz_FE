import { fetchChallengeList } from '@/api/fetchChallengeList';
import { ChallengeLocation } from '@/types/challenge';
import { convertRawChallengeData, RawChallengeLocation } from '@/utils/convertRawChallengeData';
import { create } from 'zustand';

/**
 * 챌린지 정보를 저장한다.
 */
interface ChallengeStore {
  data: ChallengeLocation[] | null; // 데이터
  loading: boolean; // 로딩 여부
  error: string | null; // 에러 여부
  fetchOnce: (accessToken: string | null) => Promise<void>; // fetch 함수
}

export const useChallengeListStore = create<ChallengeStore>((set, get) => ({
  data: null,
  loading: false,
  error: null,

  fetchOnce: async (accessToken: string | null) => {
    const { data } = get();
    if (data) return; // 이미 있다면 재요청 안 함

    set({ loading: true, error: null });

    try {
      const raw = await fetchChallengeList(accessToken);
      const converted = raw.map((item: RawChallengeLocation) => convertRawChallengeData(item));
      set({ data: converted, loading: false });
    } catch (e) {
      set({ error: '챌린지 데이터를 불러오지 못했습니다.', loading: false });
    }
  },
}));
