import { fetchChallengeResult } from '@/api/challengeDTO';
import { ChallengeResultItem } from '@/api/type';
import ChallengeResultTemplate from '@/components/template/ChallengeResultTemplate';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
export default function ChallengeResult() {
  const { id, image, condition1, condition2, condition3, point, placeName } = useLocalSearchParams();

  const [result, setResult] = useState<ChallengeResultItem>({
    attemptResult: false,
    attempt: 0,
    condition1: false,
    condition2: false,
    condition3: false,
  });
  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await fetchChallengeResult(Number(id));
        console.log('챌린지 결과의 res', res);
        setResult(res.result);
      } catch (error) {
        console.error('챌린지 결과 조회 중 에러 발생:', error);
      }
    };
    fetchResult();
  }, []);

  return (
    <ChallengeResultTemplate
      image={image as string}
      point={point as string}
      isSuccess={result.attemptResult}
      isSuccessCondition1={result.condition1}
      isSuccessCondition2={result.condition2}
      isSuccessCondition3={result.condition3}
      condition1={condition1 as string}
      condition2={condition2 as string}
      condition3={condition3 as string}
      placeName={placeName as string}
    />
  );
}
