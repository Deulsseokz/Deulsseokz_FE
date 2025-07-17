import { fetchChallengeList } from '@/api/fetchChallengeList';
import { ChallengeLocation } from '@/types/challenge';
import { convertRawChallengeData, RawChallengeLocation } from '@/utils/convertRawChallengeData';
import { create } from 'zustand';

interface ChallengeStore {
  data: ChallengeLocation[] | null;
  loading: boolean;
  error: string | null;
  fetchOnce: () => Promise<void>;
}

export const useChallengeListStore = create<ChallengeStore>((set, get) => ({
  data: null,
  loading: false,
  error: null,

  fetchOnce: async () => {
    const { data } = get();
    if (data) return; // 이미 있다면 재요청 안 함

    set({ loading: true, error: null });

    try {
      const raw = await fetchChallengeList();
      const converted = raw.map((item: RawChallengeLocation) => convertRawChallengeData(item));
      set({ data: converted, loading: false });
    } catch (e) {
      set({ error: '챌린지 데이터를 불러오지 못했습니다.', loading: false });
    }
  },
}));
