import { fetchChallengeList } from "@/api/challenge";
import { ChallengeListItem } from "@/api/type";
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

    const {result} = await fetchChallengeList(); // CommonResponse<ServerChallengeListItem[]>

    const converted: ChallengeLocation[] = result.map((item: ChallengeListItem

    ) =>
      convertRawChallengeData(item)
    );
    set({ data: converted, loading: false });
  },
}));
