import { MCOLORS } from '@/constants/colors';
import fontStyles from '@/constants/fonts';
import { StyleSheet, Text, View } from 'react-native';

/**
 * 챌린지 데이터에 대한 정보를 props로 받아 띄운다.
 * @prop: place, content, point
 * @returns
 */

interface ChallengeInfoProps {
  placeName: string;
  content: string;
  point: number;
}

export default function ChallengeInfo({ placeName, content, point }: ChallengeInfoProps) {
  return (
    <View style={style.container}>
      <View style={style.bottomWrapper}>
        <Text style={style.place}>{placeName}</Text>
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
    ...fontStyles.medium15,
  },
  content: {
    color: MCOLORS.grayscale.gray80,
    ...fontStyles.bold15,
  },
  bottomWrapper: {
    width: '100%',
  },
  point: {
    color: MCOLORS.brand.secondary,
    ...fontStyles.bold15,
    textAlign: 'right',
  },
});
