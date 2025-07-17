import { BASE_URL } from '@env';
import axios from 'axios';

export const fetchChallengeList = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/challenge/list/`);

    if (data.isSuccess) {
      return data.result;
    }
  } catch (error) {
    console.log(error);
    return;
  }
};
