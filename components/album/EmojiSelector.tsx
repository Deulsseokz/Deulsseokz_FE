import fontStyles from '@/constants/fonts';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * 이모지 선택 컴포넌트에 전달되는 props 타입
 * @template T 이모지(문자열)의 타입
 */
export interface EmojiSelectorProps<T extends string> {
  /** 선택자 앞에 붙는 라벨 텍스트 */
  label: string;
  /** 선택 가능한 값 목록 */
  options: T[];
  /** 현재 선택된 값 */
  selected: T;
  /** 선택 시 호출되는 콜백 */
  onSelect: (val: T) => void;
  /** 문자열 ↔ 이미지 매핑 */
  imageMap: Record<T, any>;
}

/**
 * 이모지 선택 컴포넌트
 * - 선택된 항목은 강조되며
 * - 클릭 시 onSelect 콜백이 호출됨
 */
export default function EmojiSelector<T extends string>({
  label,
  options,
  selected,
  onSelect,
  imageMap,
}: EmojiSelectorProps<T>) {
  return (
    <View style={styles.selector}>
      <Text style={styles.label}>{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
        {options.map(opt => {
          const isSelected = selected === opt;
          const isNone = opt === ('없음' as T);

          return (
            <TouchableOpacity
              key={opt}
              onPress={() => onSelect(opt)}
              activeOpacity={1} // 눌렀을 때 추가로 흐려지지 않게
              style={[styles.wrapper, isSelected ? styles.selected : styles.unselected]}
            >
              {isNone ? (
                <Text style={styles.noneText}>없음</Text>
              ) : (
                <Image source={imageMap[opt]} style={styles.icon} resizeMode="contain" />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  selector: {
    width: '100%',
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#4A4A4A',
    width: 36,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  wrapper: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: { opacity: 1 },
  unselected: { opacity: 0.2 },

  icon: {
    width: 44,
    height: 44,
  },
  noneText: {
    color: '#313131',
    ...fontStyles.medium13,
  },
});
