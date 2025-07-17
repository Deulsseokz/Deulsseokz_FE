import { COMMUNICATION_CODE } from '@/constants/communicationCode';
import axios from 'axios';

export const fetchSearchArea = async (place: string) => {
  try {
    const result = await axios.get(`https://melog.store/place/search-area/?area=${place}`);

    if (result.data.code === COMMUNICATION_CODE.success) {
      // 검색 결과 존재
      return { success: true, data: result.data.result.place, error: false };
    } else {
      // 검색 실패
      return { success: false, data: [], error: false };
    }
  } catch (error) {
    console.log(error);
    return { success: false, data: [], error: true };
  }
};
