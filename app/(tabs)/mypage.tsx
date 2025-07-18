import ChallengeOutputTemplate from '@/components/template/ChallengeOutputTemplate';
import { Alert } from 'react-native';

export default function TestScreen() {
  // data fetch
  const featureData = [
    {
      label: 'title1',
      description: 'description',
    },
    {
      label: 'title2',
      description: 'description',
    },
  ];

  //core logic(api, update state, ...)
  const handleAction = () => {
    Alert.alert('click');
  };

  return <ChallengeOutputTemplate />;
}
