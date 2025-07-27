import IcnClose from '@/assets/icons/icon-close-black.svg';
import IcnSearch from '@/assets/icons/icon-search.svg';
import { MCOLORS } from '@/constants/colors';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface LocationHeaderProps {
  title: string;
  onSearch: () => void;
  onClose: () => void;
}

/**
 * @returns 지역 스크린을 이루는 헤더
 */
export default function LocationHeader({ title, onSearch, onClose }: LocationHeaderProps) {
  return (
    <View style={style.container}>
      <Text style={style.title}>{title}</Text>
      <View style={style.icnContainer}>
        <TouchableOpacity onPress={onSearch}>
          <IcnSearch style={style.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <IcnClose style={style.icon} onPress={onClose} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: MCOLORS.grayscale.gray80,
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    fontWeight: '700',
    lineHeight: 28,
  },
  icnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 15,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
