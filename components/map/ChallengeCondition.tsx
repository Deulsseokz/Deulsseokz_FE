import DotIcon from '@/assets/icons/icon-dot.svg';
import { MCOLORS } from '@/constants/Colors';
import { StyleSheet, Text, View } from 'react-native';

/**
 * 2가지 화면에서 사용 ->
 * (1) 일반적 명시
 * (2) 조건 달성 여부를 명시
 * @props: condition 1,2,3
 * @returns 챌린지의 조건을 명시한 컴포넌트
 */

interface ChallengeConditionProps {
  condition1: string;
  condition2: string;
  condition3: string;
}

export default function ChallengeCondition({ condition1, condition2, condition3 }: ChallengeConditionProps) {
  return (
    <View style={style.container}>
      <View style={style.textContainer}>
        <DotIcon width={20} height={20} />
        <Text style={style.plainText}>{condition1}</Text>
      </View>
      <View style={style.textContainer}>
        <DotIcon width={20} height={20} />
        <Text style={style.plainText}>{condition2}</Text>
      </View>

      <View style={style.textContainer}>
        <DotIcon width={20} height={20} fill={MCOLORS.brand.secondary} />
        <Text style={style.emphText}>{condition3}</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 2.71,
  },
  plainText: {
    fontSize: 13,
    fontWeight: 500,
    color: MCOLORS.grayscale.gray70,
    lineHeight: 20,
  },
  emphText: {
    fontSize: 13,
    fontWeight: 500,
    color: MCOLORS.brand.secondary,
  },
});
