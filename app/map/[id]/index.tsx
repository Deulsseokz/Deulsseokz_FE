import ChallengeDetailTemplate from '@/components/template/ChallengeDetailTemplate';
import { useLocalSearchParams } from 'expo-router';

export default function ChallengeDetail() {
  const { id, image, place, content, point, condition1, condition2, condition3, friends } = useLocalSearchParams();

  return (
    <ChallengeDetailTemplate
      id={Number(id)}
      image={image as string}
      place={place as string}
      content={content as string}
      point={point as string}
      condition1={condition1 as string}
      condition2={condition2 as string}
      condition3={condition3 as string}
      friends={friends as string}
    />
  );
}
