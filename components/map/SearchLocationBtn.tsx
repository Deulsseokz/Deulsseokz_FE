import IcnSearch from '@/assets/icons/icon-locationSearch.svg';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface SearchLocationBtnProps {
  onPress: () => void;
}

export default function SearchLocationBtn({ onPress }: SearchLocationBtnProps) {
  return (
    <TouchableOpacity onPress={onPress} style={style.container}>
      <IcnSearch width={44} height={44} />
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 32,
    zIndex: 1,
  },
});
