import ChallengeResultTemplate from '@/components/template/ChallengeResultTemplate';
import { useLocalSearchParams } from 'expo-router';
export default function ChallengeResult() {
  const { id, image } = useLocalSearchParams();
  console.log('id', id);
  console.log('image', image);
  return <ChallengeResultTemplate />;
}
