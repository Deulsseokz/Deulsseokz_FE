import axios from 'axios';

export const fetchChallengeInfo = async (challengeId: number) => {
  try {
    const { data } = await axios.get(`https://melog.store/challenge/info/?placeId=${challengeId}`);

    if (data.isSuccess) {
      return data.result;
    }
  } catch (error) {
    console.log(error);
    return;
  }
};
