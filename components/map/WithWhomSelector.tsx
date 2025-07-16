import { MCOLORS } from '@/constants/Colors';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChallengeWith } from './_type';
import { WITH_WHOM_OPTIONS } from './_util';

interface WhomSelectorProps {
  selected: ChallengeWith | null;
  onChange: (whom: ChallengeWith) => void;
}

function WithWhomSelector({ selected, onChange }: WhomSelectorProps) {
  const title = '누구와 함께 할까요?';

  return (
    <View style={style.container}>
      <Text style={style.text}>{title}</Text>
      <View style={style.itemContainer}>
        {WITH_WHOM_OPTIONS.map(({ whom, label, img }) => {
          const isSelected = selected === whom;

          return (
            <TouchableOpacity key={whom} onPress={() => onChange(whom)} style={style.item}>
              <Image
                source={img}
                style={{
                  width: 34,
                  height: 34,
                  tintColor: isSelected ? MCOLORS.brand.secondary : MCOLORS.grayscale.gray30,
                }}
              />
              <Text>{label}</Text>
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
  itemContainer: {
    width: '100%',
    paddingHorizontal: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 3,
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
