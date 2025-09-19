import { getMyPointHistory, patchPointHistory } from '@/api/mypage';
import { MyPointHistoryItem, MyPointHistoryRequest } from '@/api/type';
import { create } from 'zustand';

interface PointState {
  holdingPoint: number;
  pointLogs: MyPointHistoryItem[];
  isLoading: boolean;
  error: string | null;
  fetchPointHistory: () => Promise<void>;
  updatePoint: (data: MyPointHistoryRequest) => Promise<void>;
}

export const usePointStore = create<PointState>((set, get) => ({
  holdingPoint: 0,
  pointLogs: [],
  isLoading: false,
  error: null,

  /**
   * 전체 포인트 내역을 서버에서 가져와 상태를 업데이트하는 액션
   */
  fetchPointHistory: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await getMyPointHistory();

      if (response.isSuccess) {
        const { holdingPoint, pointLogs } = response.result;
        set({
          holdingPoint,
          pointLogs,
          isLoading: false,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (e) {
      const err = e as Error;
      set({ error: err.message, isLoading: false });
      console.error('Failed to fetch point history:', err);
    }
  },

  /**
   * 포인트를 사용하거나 적립하고, 최신 내역으로 다시고침하는 액션
   * @param {MyPointHistoryRequest} data - 포인트 변경 내용
   */
  updatePoint: async (data: MyPointHistoryRequest) => {
    set({ isLoading: true, error: null });
    try {
      const response = await patchPointHistory(data);

      if (response.isSuccess) {
        await get().fetchPointHistory();
      } else {
        throw new Error(response.message);
      }
    } catch (e) {
      const err = e as Error;
      set({ error: err.message, isLoading: false });
      console.error('Failed to update point:', err);
      throw e;
    }
  },
}));
