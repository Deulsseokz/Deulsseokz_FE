import { COMMUNICATION_CODE } from '@/constants/communicationCode';
import { BASE_URL } from '@env';
import axios from 'axios';

/**
 *
 * @param place 검색된 지역을 string으로 받습니다.
 * @returns 지역에 속한 모든 랜드마크를 배열로 반환합니다.
 */
export const fetchSearchArea = async (place: string) => {
  try {
    const result = await axios.get(`${BASE_URL}/place/search-area/?area=${place}`);

    if (result.data.code === COMMUNICATION_CODE.success) {
      // 검색 결과 존재
      return { success: true, data: result.data.result.place, error: false };
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data.code === COMMUNICATION_CODE.areaFail) return { success: false, data: [], error: false };
    } else {
      console.error('Unknown Error:', error);
      return { success: false, data: [], error: true };
    }
  }
};
