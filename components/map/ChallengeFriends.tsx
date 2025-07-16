/**
 *
 * @returns 챌린지를 함께하는 친구를 명시하는 컴포넌트
 */

import { MCOLORS } from '@/constants/Colors';
import { StyleSheet, Text } from 'react-native';

function ChallengeFriends() {
  return <Text style={style.text}>함께하는 친구</Text>;
}

export default ChallengeFriends;

const style = StyleSheet.create({
  text: {
    color: MCOLORS.grayscale.gray80,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 15,
  },
});
