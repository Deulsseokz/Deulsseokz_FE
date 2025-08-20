import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
/**
 *
 * @returns 모든 챌린지 리스트를 반환하여 맵에 폴리곤을 렌더링합니다.
 */
export const fetchChallengeList = async (accessToken: string | null) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/challenge/list/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (data.isSuccess) {
      return data.result;
    }
  } catch (error) {
    console.log(error);
    return;
  }
};
