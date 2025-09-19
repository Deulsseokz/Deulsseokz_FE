import { fetchChallengeList } from "@/api/challengeDTO";
import { ChallengeLocation } from '@/types/challenge';
import { convertRawChallengeData } from '@/utils/convertRawChallengeData';
import { create } from 'zustand';

/**
 * @description 챌린지 정보를 불러와 저장합니다
 */

interface ChallengeStore {
  data: ChallengeLocation[] | null; // 데이터
  loading: boolean; // 로딩 여부
  fetchData: () => Promise<void>; // fetch 함수
}

export const useChallengeListStore = create<ChallengeStore>((set, get) => ({
  data: null,
  loading: false,
  error: null,

  fetchData: async () => {
    const { data } = get();

    set({ loading: true });

    try {
       const response = await fetchChallengeList(); // CommonResponse<ServerChallengeListItem[]>

    if (response.isSuccess) {
      const rawData = response.result; // ServerChallengeListItem[]
      if (rawData.length === 0) {
        set({ data: [], loading: false });
        return;
      }
      const converted = rawData.map(convertRawChallengeData); // ChallengeLocation[]
      set({ data: converted, loading: false });
    }
    } catch (error) {
      set({ loading: false });
    }
  },
}));
