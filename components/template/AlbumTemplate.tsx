import { Friend } from '@/types/friend';
import { router } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChallengeWith, SheetStep } from '../map/_type';
import ChallengeCondition from '../map/ChallengeCondition';
import ChallengeInfo from '../map/ChallengeInfo';
import FriendSelector from '../map/FriendSelector';
import SheetHeader from '../map/SheetHeader';
import SelectWithWhom from '../map/WithWhomSelector';

export default function AlbumTemplate(type: SheetStep) {
  type = SheetStep.INFO;

  const MOCK_FRIENDS: Friend[] = [
    { userId: 1, userName: '지민' },
    { userId: 2, userName: '태형' },
    { userId: 3, userName: '정국' },
    { userId: 4, userName: '석진' },
    { userId: 5, userName: '남준' },
    { userId: 6, userName: '호석' },
    { userId: 7, userName: '윤기' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => router.push('/test')}>
        <Text>Album</Text>
      </Pressable>
      <SheetHeader place="남산타워" isFavorite={true} exitSheet={() => console.log('클릭')} step={type} />
      {/* step 1 */}
      <ChallengeInfo place="남산타워" content="케이블카에서 사진 찍기" point={200} />
      <ChallengeCondition
        condition1="두 사람 모두 사진에 나와야 해요"
        condition2="두 사람 모두 사진에 나와야 해요"
        condition3="두 사람 모두 사진에 나와야 해요"
      />
      {/* step 2 */}
      <SelectWithWhom onSelect={(whom: ChallengeWith) => Alert.alert(whom)} />
      <FriendSelector friends={MOCK_FRIENDS} onSelected={() => console.log()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
