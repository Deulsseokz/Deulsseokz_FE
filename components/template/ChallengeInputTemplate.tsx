import { MCOLORS } from '@/constants/Colors';
import { StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../common/PrimaryButton';
import { TopBar } from '../common/TopBar';

export default function ChallengeInputTemplate() {
  return (
    <View style={styles.page}>
      <TopBar title="챌린지 입력" />
      <View style={styles.container}>
        <Text style={styles.title}>이 사진을 제출할까요?</Text>
        <View></View>
        <Text style={styles.text}>도전 횟수 (1/3)</Text>
        <View>
          <PrimaryButton kind="normal-dismiss" text="다시 찍기" onPress={() => {}} />
          <PrimaryButton kind="status-enabled" text="제출하기" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
    color: '#000',
  },
  text: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
    color: MCOLORS.grayscale.gray50,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 18,
  },
});
