import ChallengeResultTemplate from '@/components/template/ChallengeResultTemplate';
import { useLocalSearchParams } from 'expo-router';
export default function ChallengeResult() {
  const {
    id,
    image,
    isSuccess,
    isSuccessCondition1,
    isSuccessCondition2,
    isSuccessCondition3,
    condition1,
    condition2,
    condition3,
  } = useLocalSearchParams();

  return (
    <ChallengeResultTemplate
      id={Number(id)}
      image={image as string}
      isSuccess={isSuccess === 'true'}
      isSuccessCondition1={isSuccessCondition1 === 'true'}
      isSuccessCondition2={isSuccessCondition2 === 'true'}
      isSuccessCondition3={isSuccessCondition3 === 'true'}
      condition1={condition1 as string}
      condition2={condition2 as string}
      condition3={condition3 as string}
    />
  );
}
