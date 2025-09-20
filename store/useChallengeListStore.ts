import { fetchChallengeList } from "@/api/challengeDTO";
import { ChallengeLocation } from '@/types/challenge';
import { convertRawChallengeData } from '@/utils/convertRawChallengeData';
import { create } from 'zustand';

interface ChallengeStore {
  data: ChallengeLocation[] | null;
  loading: boolean;
  fetchData: () => Promise<void>; // 데이터가 없을 때만 fetch
  refetchData: () => Promise<void>; // 강제로 다시 fetch
}

export const useChallengeListStore = create<ChallengeStore>((set, get) => ({
  data: null,
  loading: false,

  // 1. 데이터가 없을 때만 호출되는 함수
  fetchData: async () => {
    // // 스토어에 데이터가 이미 있으면 함수를 바로 종료
    if (get().data) {
      return;
    }
    set({ loading: true });
    try {
      const response = await fetchChallengeList();
      if (response.isSuccess) {
        const rawData = response.result;
        if (rawData.length === 0) {
          set({ data: [], loading: false });
          return;
        }
        const converted = rawData.map(convertRawChallengeData);
        set({ data: converted, loading: false });
      }
    } catch (error) {
      set({ loading: false });
    }
  },

  // 2. 필요할 때마다 데이터를 강제로 새로고침하는 함수
  refetchData: async () => {
    set({ loading: true }); // 새로고침 시에도 로딩 상태 표시
    try {
      const response = await fetchChallengeList();
      if (response.isSuccess) {
        const rawData = response.result;
        const converted = rawData.map(convertRawChallengeData);
        set({ data: converted, loading: false });
      }
    } catch (error) {
      set({ loading: false });
    }
  },
}));