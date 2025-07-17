import axios from 'axios';

export const fetchChallengeList = async () => {
  try {
    const { data } = await axios.get(`https://melog.store/challenge/list/`);

    if (data.isSuccess) {
      return data.result;
    }
  } catch (error) {
    console.log(error);
    return;
  }
};
