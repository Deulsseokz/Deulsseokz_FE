import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
/**
 *
 * @param challengeId 챌린지 구분 id : number
 * @returns id에 맞는 챌린지 정보를 반환합니다. 유저의 챌린지 도전 혹은 정보확인에 사용됩니다.
 */
export const fetchChallengeInfo = async (challengeId: number) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/challenge/info/?placeId=${challengeId}`);

    if (data.isSuccess) {
      return data.result;
    }
  } catch (error) {
    console.log(error);
    return;
  }
};
