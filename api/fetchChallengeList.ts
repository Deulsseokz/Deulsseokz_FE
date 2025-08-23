import api from './client';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
/**
 *
 * @returns 모든 챌린지 리스트를 반환하여 맵에 폴리곤을 렌더링합니다.
 */
export const fetchChallengeList = async () => {
  try {
    const { data } = await api.get(`${BASE_URL}/challenge/list/`);

    if (data.isSuccess) {
      return data.result;
    }
  } catch (error) {
    console.log(error);
    return;
  }
};
