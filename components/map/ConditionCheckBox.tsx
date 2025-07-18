import IconCheck from '@/assets/icons/icon-check.svg';
import IconCross from '@/assets/icons/icon-cross.svg';
import { MCOLORS } from '@/constants/Colors';
import { StyleSheet, Text, View } from 'react-native';

interface ConditionCheckBoxProps {
  condition1: string;
  condition2: string;
  condition3: string;
  isSuccessCondition1: boolean;
  isSuccessCondition2: boolean;
  isSuccessCondition3: boolean;
}

export default function ConditionCheckBox({
  condition1,
  condition2,
  condition3,
  isSuccessCondition1,
  isSuccessCondition2,
  isSuccessCondition3,
}: ConditionCheckBoxProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {isSuccessCondition1 ? <IconCheck width={20} height={20} /> : <IconCross width={20} height={20} />}
        <Text style={styles.plainText}>{condition1}</Text>
      </View>
      <View style={styles.textContainer}>
        {isSuccessCondition2 ? <IconCheck width={20} height={20} /> : <IconCross width={20} height={20} />}
        <Text style={styles.plainText}>{condition2}</Text>
      </View>

      {condition3 && (
        <View style={styles.textContainer}>
          {isSuccessCondition3 ? <IconCheck width={20} height={20} /> : <IconCross width={20} height={20} />}
          <Text style={styles.emphText}>{condition3}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
    alignItems: 'flex-start',
    gap: 2.71,
    paddingHorizontal: 5,
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
