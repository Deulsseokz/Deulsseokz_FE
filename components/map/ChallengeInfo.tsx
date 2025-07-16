import { MCOLORS } from '@/constants/Colors';
import { StyleSheet, Text, View } from 'react-native';

/**
 * 챌린지 데이터를 props로 받아 띄운다.
 * @prop:place, content, point
 * @returns
 */

interface ChallengeInfoProps {
  place: string;
  content: string;
  point: number;
}

export default function ChallengeInfo({ place, content, point }: ChallengeInfoProps) {
  return (
    <View style={style.container}>
      <View style={style.bottomWrapper}>
        <Text style={style.place}>{place}</Text>
      </View>

      <View style={style.bottomWrapper}>
        <Text style={style.content}>{content}</Text>
        <Text style={style.point}>+{point}</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 5,
    paddingLeft: 22,
    paddingRight: 22,
  },
  place: {
    color: MCOLORS.grayscale.gray50,
    fontSize: 15,
    fontWeight: 500,
  },
  content: {
    color: MCOLORS.grayscale.gray80,
    fontSize: 15,
    fontWeight: 700,
  },
  bottomWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  point: {
    color: MCOLORS.brand.secondary,
    fontSize: 15,
    fontWeight: 700,
  },
});
