import { BASE_URL } from '@env';
import axios from 'axios';

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
