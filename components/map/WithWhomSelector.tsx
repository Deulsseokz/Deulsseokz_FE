import { MCOLORS } from '@/constants/Colors';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChallengeWith } from './_type';
import { WITH_WHOM_OPTIONS } from './_util';

interface WhomSelectorProps {
  selected: ChallengeWith | undefined; // 선택지: 혼자, 친구와 함께/ undefined: 아직 선택되지 않음.
  updateValue: (whom: ChallengeWith) => void; // 선택지가 변경되면 부모에 전달
}

/**
 *
 * @param param0 선택지 2가지(혼자/함께), 선택지 변경 핸들러
 * @returns 혼자/함께 셀렉터
 */
function WithWhomSelector({ selected, updateValue }: WhomSelectorProps) {
  const title = '누구와 함께 할까요?';

  return (
    <View style={style.container}>
      <Text style={style.text}>{title}</Text>
      <View style={style.itemContainer}>
        {WITH_WHOM_OPTIONS.map(({ whom, label, icon }) => {
          const isSelected = selected === whom;
          return (
            <TouchableOpacity key={whom} onPress={() => updateValue(whom)} style={style.item}>
              <Image
                source={isSelected ? icon.active : icon.inactive}
                style={{ width: 34, height: 34, resizeMode: 'contain' }}
              />
              <Text style={{ ...style.label, color: !isSelected ? '#acacac' : MCOLORS.grayscale.gray80 }}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default WithWhomSelector;

const style = StyleSheet.create({
  container: {
    width: '100%',
    gap: 22,
  },
  text: {
    color: '#2a2a2a',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
    marginLeft: 41,
  },
  label: {
    color: MCOLORS.grayscale.gray30,
    fontSize: 15,
    fontWeight: 500,
  },
  itemContainer: {
    width: '100%',
    paddingHorizontal: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 60,
  },
  item: {
    width: 96,
    height: 96,
    borderWidth: 1,
    borderColor: MCOLORS.grayscale.gray30,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderRadius: 12,
  },
  itemSelected: {
    borderColor: MCOLORS.brand.secondary,
    borderWidth: 2,
  },
});
